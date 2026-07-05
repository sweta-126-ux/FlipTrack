import styles from "./item-header.module.css";

interface Props { className?: string; item: any; }

export function ItemHeader({ className, item }: Props) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(" ")}>
      <div className={styles.image}>Product Image</div>
      <div className={styles.info}>
        <div className={styles.sku}>{item.sku}</div>
        <h1 className={styles.name}>{item.name}</h1>
        <div className={styles.meta}>
          <span>{item.brand}</span>
          <span>·</span>
          <span>Size {item.size}</span>
          <span>·</span>
          <span>{item.condition}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.editBtn}>Edit</button>
        <button className={styles.deleteBtn}>Delete</button>
      </div>
    </div>
  );
}
