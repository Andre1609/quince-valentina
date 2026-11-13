import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xsijdfaxvdqbtrdqovij.supabase.co'
const supabaseAnonKey = 'sb_publishable__3sSPniCV-idXAUd4-_pzg_0mrp4cGC'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)