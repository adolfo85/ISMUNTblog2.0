import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwcmalcywzixmqostvjl.supabase.co'
const supabaseAnonKey = 'sb_publishable_SaD0EFAZPPG0FaQAp08wYQ_qBIbg7Wt'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
