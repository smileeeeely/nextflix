import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY!;

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
