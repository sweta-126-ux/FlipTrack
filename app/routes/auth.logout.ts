import { redirect } from "react-router";
import type { Route } from "./+types/auth.logout";
import { getSupabaseServerClient } from "~/utils/supabase.server";

export async function action({ request }: Route.ActionArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  await supabase.auth.signOut();
  return redirect("/auth/login", { headers });
}

export async function loader() {
  return redirect("/auth/login");
}
