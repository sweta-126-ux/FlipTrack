import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./price-history-chart.module.css";

interface Props { className?: string; priceHistory: any[]; }

const marketplaceColors: Record<string, string> = {
  stockx: "#00FF88", goat: "#7C3AED", ebay: "#3B82F6", flightclub: "#FFB347", stadiumgoods: "#FF4D6A",
};

export function PriceHistoryChart({ className, priceHistory }: Props) {
  if (!priceHistory.length) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(" ")}>
      <div className={styles.title}>30-Day Price History</div>
      <p>No price history available.</p>
    </div>
  );
}
  return (
    <div className={[styles.card, className].filter(Boolean).join(" ")}>
      <div className={styles.title}>30-Day Price History</div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={priceHistory} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="fetchedAt" tick={{ fill: "var(--color-text-subtle)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--color-text-subtle)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
          <Tooltip contentStyle={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${Number(v)}`, ""]} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line
            type="monotone"
            dataKey="askPrice"
            stroke="#00FF88"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
