import styles from "./item-info-card.module.css";

interface Props { className?: string; item: any; }

export function ItemInfoCard({ className, item }: Props) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(" ")}>
      <div className={styles.title}>Item Details</div>
      <div className={styles.field}><div className={styles.label}>Purchase Price</div><div className={[styles.value, styles.money].join(" ")}>${Number(item.purchasePrice).toFixed(2)}</div></div>
      <div className={styles.field}><div className={styles.label}>Purchase Date</div><div className={styles.value}>{new Date(item.purchaseDate).toLocaleDateString() }</div></div>
      <div className={styles.field}><div className={styles.label}>Condition</div><div className={styles.value}>{item.condition}</div></div>
      <div className={styles.field}><div className={styles.label}>Status</div><div className={styles.value}><span className={styles.badge}>{item.status}</span></div></div>
      <div className={styles.field}><div className={styles.label}>Asking Price</div><div className={[styles.value, styles.money].join(" ")}>${item.askingPrice ? Number(item.askingPrice).toFixed(2) : "N/A"}</div></div>
      <div className={styles.field}><div className={styles.label}>Notes</div><div className={styles.value}>{item.notes || "No notes available"}</div></div>
    </div>
  );
}
