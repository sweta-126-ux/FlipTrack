import { Link, NavLink, useSubmit } from "react-router";
import { 
  IconDashboard, 
  IconBox, 
  IconChartLine, 
  IconReceipt, 
  IconWallet, 
  IconBrain, 
  IconSettings,
  IconLogout
} from "@tabler/icons-react";
import styles from "./app-sidebar.module.css";

interface Props {
  user: {
    name?: string | null;
    email: string;
    plan?: string | null;
  };
}

export function AppSidebar({ user }: Props) {
  const submit = useSubmit();

  const handleLogout = () => {
    submit(null, { method: "post", action: "/auth/logout" });
  };

  const navLinks = [
    { to: "/app/dashboard", label: "Dashboard", icon: <IconDashboard size={20} /> },
    { to: "/app/inventory", label: "Inventory", icon: <IconBox size={20} /> },
    { to: "/app/market-prices", label: "Market Prices", icon: <IconChartLine size={20} /> },
    { to: "/app/sales", label: "Sales Log", icon: <IconReceipt size={20} /> },
    { to: "/app/expenses", label: "Expenses", icon: <IconWallet size={20} /> },
    { to: "/app/ai-insights", label: "AI Insights", icon: <IconBrain size={20} /> },
    { to: "/app/settings", label: "Settings", icon: <IconSettings size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <Link to="/app/dashboard" className={styles.logo}>
          Flip<span className={styles.accent}>Track</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              [styles.navItem, isActive ? styles.navItemActive : ""].filter(Boolean).join(" ")
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name || "User"}</span>
            <span className={styles.userPlan}>{user.plan || "FREE PLAN"}</span>
          </div>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <IconLogout size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
