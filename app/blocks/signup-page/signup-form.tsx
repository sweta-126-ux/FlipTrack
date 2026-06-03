import { Form, useActionData } from "react-router";
import styles from "./signup-form.module.css";

interface Props { className?: string; }

export function SignupForm({ className }: Props) {
  const actionData = useActionData<{ error?: string }>();
  return (
    <Form method="post" className={[styles.form, className].filter(Boolean).join(" ")}>
      {actionData?.error && (
        <div style={{ color: "red", fontSize: 14, marginBottom: 12 }}>{actionData.error}</div>
      )}
      <div className={styles.field}><label className={styles.label}>Full Name</label><input className={styles.input} type="text" name="name" placeholder="John Doe" required /></div>
      <div className={styles.field}><label className={styles.label}>Email</label><input className={styles.input} type="email" name="email" placeholder="your@email.com" required /></div>
      <div className={styles.field}><label className={styles.label}>Password</label><input className={styles.input} type="password" name="password" placeholder="Min 8 chars" required minLength={8} /></div>
      <div className={styles.field}><label className={styles.label}>Confirm Password</label><input className={styles.input} type="password" name="confirmPassword" placeholder="Repeat password" required minLength={8} /></div>
      <button type="submit" className={styles.submitBtn}>Create Account</button>
    </Form>
  );
}
