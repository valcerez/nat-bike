import { createClient } from '@supabase/supabase-js'

// TODO: Remplace ces valeurs par tes vrais credentials Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Pour un MVP simple, on utilise un user_id fixe
// Tu peux ajouter l'authentification plus tard si nécessaire
export const CURRENT_USER_ID = 'demo-user-1'
