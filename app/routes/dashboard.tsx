import { useLoaderData } from "react-router";
import type { Route } from "./+types/dashboard";
import { getSupabaseServerClient } from "~/utils/supabase.server";
import { PrismaClient } from "@prisma/client";
import styles from "./dashboard.module.css";
import { DashboardHeader } from "~/blocks/dashboard/dashboard-header";
import { StatsCardsRow } from "~/blocks/dashboard/stats-cards-row";
import { CashFlowChart } from "~/blocks/dashboard/cash-flow-chart";
import { TopBrandsChart } from "~/blocks/dashboard/top-brands-chart";
import { SalesByMarketplacePie } from "~/blocks/dashboard/sales-by-marketplace-pie";
import { TopSellingItemsTable } from "~/blocks/dashboard/top-selling-items-table";
import { RecentSales } from "~/blocks/dashboard/recent-sales";

const prisma = new PrismaClient();

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = getSupabaseServerClient(request);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { inventoryStats: null, salesData: [], expensesData: [] };
  }

  const [inventoryStats, salesData, expensesData] = await Promise.all([
    prisma.inventoryItem.aggregate({
      where: { userId: user.id, status: 'IN_STOCK' },
      _sum: { purchasePrice: true },
      _count: true,
    }),
    prisma.sale.findMany({
      where: { userId: user.id },
      include: { expenses: true, inventoryItem: true },
      orderBy: { saleDate: 'desc' },
    }),
    prisma.expense.findMany({
      where: { userId: user.id },
    }),
  ]);

  return { inventoryStats, salesData, expensesData };
}

export default function DashboardPage() {
  const { inventoryStats, salesData, expensesData } = useLoaderData<typeof loader>();
  return (
    <div className={styles.page}>
      <DashboardHeader />
      <StatsCardsRow />
      <CashFlowChart />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)", marginBottom: "var(--space-6)" }}>
        <TopBrandsChart />
        <SalesByMarketplacePie />
      </div>
      <TopSellingItemsTable />
      <RecentSales />
    </div>
  );
}
