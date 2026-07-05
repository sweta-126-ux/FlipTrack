import styles from "./inventory-item-detail.module.css";
import { ItemHeader } from "~/blocks/inventory-item-detail/item-header";
import { ItemInfoCard } from "~/blocks/inventory-item-detail/item-info-card";
import { PriceHistoryChart } from "~/blocks/inventory-item-detail/price-history-chart";
import { MarketplaceComparison } from "~/blocks/inventory-item-detail/marketplace-comparison";
import { SalesHistory } from "~/blocks/inventory-item-detail/sales-history";
import { RelatedItems } from "~/blocks/inventory-item-detail/related-items";
import { useLoaderData } from "react-router";

import { PrismaClient } from "@prisma/client";
import { getSupabaseServerClient } from "~/utils/supabase.server";

const prisma = new PrismaClient();

export async function loader({ request, params }: any) {
  const { supabase } = getSupabaseServerClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

 if (!user) {
  return {
    item: null,
    priceHistory: [],
    relatedItems: [],
  };
}

const item = await prisma.inventoryItem.findFirst({
  where: {
    id: params.id,
    userId: user.id,
  },
  include: {
    priceHistory: {
      orderBy: {
        fetchedAt: "asc",
      },
    },
  },
});

if (!item) {
  return {
    item: null,
    priceHistory: [],
    relatedItems: [],
  };
}

const relatedItems = await prisma.inventoryItem.findMany({
  where: {
    userId: user.id,
    brand: item.brand, // <-- issue requirement
    id: {
      not: item.id,
    },
  },
  take: 4,
});

return {
  item,
  priceHistory: item.priceHistory,
  relatedItems,
};
}
  

export default function InventoryItemDetailPage() {
  const { item, priceHistory, relatedItems } =
    useLoaderData<typeof loader>();

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className={styles.page}>
      <ItemHeader item={item} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "var(--space-6)",
          marginBottom: "var(--space-6)",
        }}
      >
        <ItemInfoCard item={item} />
        <PriceHistoryChart priceHistory={priceHistory} />
      </div>

      <MarketplaceComparison />
      <SalesHistory />
      <RelatedItems items={relatedItems} />
    </div>
  );
}