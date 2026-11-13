# 👑 Invitación Digital XV Años

Invitación web interactiva para unos XV años, con **confirmación de asistencia, control de cupos y correos automáticos**. Usada en un evento real con **151 invitados confirmados**.

🔗 **Sitio en vivo:** https://andre1609.github.io/quince-valentina/
> El evento ya se realizó, por lo que el formulario está cerrado en la versión pública.

🧪 **Probar la invitación en modo demo:** https://andre1609.github.io/quince-valentina/?demo=true
> En modo demo el contador corre hacia una fecha ficticia (2030) y el formulario guarda en una tabla de prueba. Usa tu propio correo: recibirás el correo de confirmación real.

![Portada](./docs/portada.jpeg)

## ✨ Funcionalidades

- Sobre animado con música de fondo y pantalla de apertura
- Cuenta regresiva en tiempo real al evento
- Secciones de mensaje, agradecimientos, regalos y detalles (ubicación con Google Maps, código de vestimenta)
- **Formulario RSVP** con validación y registro en base de datos
- **Límite de 160 cupos**: al llegar al tope, el formulario se cierra automáticamente
- **Correo de confirmación** inmediato al registrarse
- **Recordatorio automático** el día del evento
- **Modo demo** con tabla separada, para probar sin afectar datos reales
- Diseño responsive (móvil y escritorio)

## 🛠️ Stack

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?logo=github&logoColor=white)

**Servicios:** EmailJS (correos), Supabase Edge Functions + pg_cron (tareas programadas).

## 🏗️ Arquitectura

```mermaid
flowchart LR
  A[Invitado] --> B[React + Vite<br/>GitHub Pages]
  B -->|insert / rpc| C[(Supabase<br/>PostgreSQL + RLS)]
  B -->|confirmación| E[EmailJS]
  D[pg_cron diario] --> F[Edge Function<br/>enviar-recordatorio]
  F --> C
  F --> E
  E --> G[Correo del invitado]
  H[GitHub Actions<br/>keep-alive] --> C
```

## 🔐 Decisiones técnicas y retos resueltos

| Reto | Solución |
|---|---|
| Filtrar duplicados sin exponer datos | Validación movida del navegador a una restricción `UNIQUE` en el email; el error `23505` se muestra como mensaje amigable |
| Fuga de datos de invitados | Lectura pública eliminada con **RLS**; solo se permite `INSERT` al rol `anon` |
| Mostrar el cupo sin leer la tabla | Función SQL `get_total_confirmados()` con `SECURITY DEFINER` que devuelve solo un número |
| Correos en spam (DMARC) | Mailjet con remitente Gmail caía en spam; se migró el envío a EmailJS, que usa los servidores de Gmail |
| Recordatorio sin intervención manual | Edge Function con validación de fecha, programada con `pg_cron` y marcada con `recordatorio_enviado` para evitar duplicados |
| Pausa por inactividad del plan gratuito | Workflow de GitHub Actions que consulta la base cada 3 días |
| Probar sin tocar datos reales | Modo demo con `?demo=true`: tabla `confirmaciones_demo` y fecha de evento ficticia |

## 📸 Capturas

| Sobre | Cuenta regresiva | Formulario | Correo | Muestra de tabla |
|---|---|---|---|---|
| <img src="./docs/portada.jpeg" width="150"> | <img src="./docs/contador.jpeg" width="150"> | <img src="./docs/formulario.jpeg" width="150"> | <img src="./docs/correo.jpeg" width="150"> | <img src="./docs/tabla.jpeg" width="150"> |

### Base de datos

<img src="./docs/tabla.jpeg" width="600">

## 📊 Resultados

- **151** invitados confirmados de **160** cupos
- **2** correos automáticos (confirmación y recordatorio)
- **0** costo de infraestructura (planes gratuitos)

## 🚀 Ejecutar en local

```bash
npm install
npm run dev
```

Crea un `.env` con tus propias credenciales de Supabase y EmailJS.

- Modo demo: `?demo=true`
- Simular una fecha en el contador: `?fecha=2026-09-10T12:00:00`

## 📝 Aprendizajes

Seguridad con RLS, diseño de funciones en Postgres, tareas programadas, integración de servicios de correo y despliegue continuo.
