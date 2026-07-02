import styles from "./report-generator.module.css";

interface Props { className?: string; }

export function ReportGenerator({ className }: Props) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(" ")}>
      <div className={styles.title}>Generate Tax Report</div>
      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Tax Year</label>
          <select className={styles.select}><option>2024</option><option>2023</option><option>2022</option></select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Currency</label>
          <select className={styles.select}><option>USD ($)</option><option>CAD (CA$)</option><option>GBP (£)</option></select>
        </div>
        <button className={styles.generateBtn}>Generate Report</button>
      </div>
    </div>
  );
}
