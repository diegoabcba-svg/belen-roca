import { createClient } from '@supabase/supabase-js'

const url = 'https://mrblqdggttyzrbyodkgd.supabase.co'
const key = 'sb_publishable_V8xXRy9_J8Jfzz05RXRt1Q_4ZaMWtyq'

export const supabase = createClient(url, key)