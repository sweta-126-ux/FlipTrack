import { redirect } from "react-router";
import type { Route } from "./+types/signup-page";
import { getSupabaseServerClient } from "~/utils/supabase.server";
import { PrismaClient } from "@prisma/client";
import styles from "./signup-page.module.css";
import { SignupForm } from "~/blocks/signup-page/signup-form";
import { OAuthSignup } from "~/blocks/signup-page/o-auth-signup";
import { LoginLink } from "~/blocks/signup-page/login-link";
import { TermsAcceptance } from "~/blocks/signup-page/terms-acceptance";

const prisma = new PrismaClient();

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  const { data: { user } } = await supabase.auth.getUser();
  if (user) return redirect("/app/dashboard", { headers });
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Insert into public.User if signed up successfully
  if (data.user) {
    await prisma.user.upsert({
      where: { id: data.user.id },
      update: {},
      create: {
        id: data.user.id,
        email: data.user.email!,
        name,
      },
    });
  }

  return redirect("/app/dashboard", { headers });
}

export default function SignupPage() {
  return (
    <div className={styles.page}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <div style={{ fontFamily: "var(--family-display)", fontSize: 24, fontWeight: 800, marginBottom: 4, color: "var(--color-text)" }}>
            Flip<span style={{ color: "var(--color-primary)" }}>Track</span>
          </div>
          <p style={{ color: "var(--color-text-muted)", fontSize: 14 }}>Create your free account</p>
        </div>
        <OAuthSignup />
        <SignupForm />
        <TermsAcceptance />
        <LoginLink />
      </div>
    </div>
  );
}
