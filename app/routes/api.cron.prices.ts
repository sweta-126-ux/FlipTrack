import type { Route } from "./+types/api.cron.prices";
import { PrismaClient } from "@prisma/client";
import { runAllScrapers } from "~/services/scrapers";

const prisma = new PrismaClient();

export async function loader({ request }: Route.LoaderArgs) {
  // Protect with cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Fetch unique SKU/Size combinations
  const items = await prisma.inventoryItem.findMany({
    select: { sku: true, size: true },
    distinct: ["sku", "size"],
  });

  // Run scrapers for each
  for (const item of items) {
    if (item.sku && item.size) {
      await runAllScrapers(item.sku, item.size);
    }
  }

  return { success: true, count: items.length };
}
