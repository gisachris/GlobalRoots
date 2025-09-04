import { createClient } from '@supabase/supabase-js'

const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_PROJECT_API_KEY)