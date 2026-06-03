import React from "react";
import { Link, useLocation } from "react-router";
import { IconChevronRight } from "@tabler/icons-react";
import styles from "./breadcrumb-navigation.module.css";

interface Props {
  className?: string;
}

const routeLabels: Record<string, string> = {
  app: "App",
  dashboard: "Dashboard",
  inventory: "Inventory",
  "market-prices": "Market Prices",
  sales: "Sales",
  expenses: "Expenses",
  "income-statement": "Income Statement",
  alerts: "Price Alerts",
  "ai-insights": "AI Insights",
  settings: "Settings",
  billing: "Billing",
  "tax-report": "Tax Report",
};

export function BreadcrumbNavigation({ className }: Props) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, idx) => ({
    label: routeLabels[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
    to: "/" + segments.slice(0, idx + 1).join("/"),
    isLast: idx === segments.length - 1,
  }));

  if (crumbs.length <= 1) return null;

  return (
    <nav className={[styles.breadcrumb, className].filter(Boolean).join(" ")} aria-label="Breadcrumb">
      <div className={styles.inner}>
        {crumbs.map((crumb, i) => (
          <React.Fragment key={crumb.to}>
            {i > 0 && (
              <IconChevronRight size={12} className={styles.separator} />
            )}
            {crumb.isLast ? (
              <span className={styles.current}>{crumb.label}</span>
            ) : (
              <Link to={crumb.to} className={styles.crumb}>{crumb.label}</Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
