import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

async function run() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const res = await supabase.auth.signInWithPassword({ email: 'demo@fliptrack.app', password: 'password123' });
  console.log(JSON.stringify(res, null, 2));
}

run();
