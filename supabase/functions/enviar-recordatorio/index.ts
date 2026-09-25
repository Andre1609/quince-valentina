import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const EMAILJS_SERVICE_ID = 'service_h3osboe'
const EMAILJS_TEMPLATE_ID = 'template_arjxcqw'
const EMAILJS_PUBLIC_KEY = 'rvi77d8S6R7URFq7J'
const EMAILJS_PRIVATE_KEY = Deno.env.get('EMAILJS_PRIVATE_KEY')!

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const modoTest = url.searchParams.get('test') === 'true'

  const hoy = new Date()
  const fechaObjetivo = new Date('2026-09-25')
  
  const esHoyLaFecha = 
    hoy.getFullYear() === fechaObjetivo.getFullYear() &&
    hoy.getMonth() === fechaObjetivo.getMonth() &&
    hoy.getDate() === fechaObjetivo.getDate()

  if (!esHoyLaFecha && !modoTest) {
    return new Response(
      JSON.stringify({ message: 'Hoy no es la fecha programada para este recordatorio.' }),
      { status: 200 }
    )
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  const { data: invitados, error } = await supabase
    .from('confirmaciones')
    .select('*')
    .eq('attending', 'si')
    .eq('recordatorio_enviado', false)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  if (!invitados || invitados.length === 0) {
    return new Response(JSON.stringify({ message: 'No hay invitados pendientes de recordatorio.' }), { status: 200 })
  }

  const resultados = []

  for (const invitado of invitados) {
    try {
      const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          accessToken: EMAILJS_PRIVATE_KEY,
          template_params: {
            to_name: invitado.name,
            to_email: invitado.email,
            guests: invitado.guests,
          },
        }),
      })

      if (emailjsResponse.ok) {
        await supabase
          .from('confirmaciones')
          .update({ recordatorio_enviado: true })
          .eq('email', invitado.email)

        resultados.push({ email: invitado.email, status: 'enviado' })
      } else {
        const errorText = await emailjsResponse.text()
        resultados.push({ email: invitado.email, status: 'error', detalle: errorText })
      }
    } catch (err) {
      resultados.push({ email: invitado.email, status: 'error', detalle: String(err) })
    }
  }

  return new Response(JSON.stringify({ resultados }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})