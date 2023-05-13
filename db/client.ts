import { createClient } from "@supabase/supabase-js";
process.env.NEXT_SUPABASE_URL as string, process.env.NEXT_SUPABASE_SERVICE_KEY as string

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;