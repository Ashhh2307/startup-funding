import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lrmzbtwwgpklgromtovw.supabase.co'
const supabaseKey = 'sb_publishable_Esg34JKDonr20XGaGk6Ozg_aKWtXldG'

export const supabase = createClient(supabaseUrl, supabaseKey)
