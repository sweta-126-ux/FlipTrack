import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import type { Route } from "./+types/api.ai.insights";
import { getSupabaseServerClient } from "~/utils/supabase.server";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Optional: protect this endpoint so only logged-in users can use it
  const { supabase } = getSupabaseServerClient(request);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const { sku, productName, priceHistory, currentInventory } = body;

  try {
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: `You are an expert sneaker reseller analyst. Analyze price data and provide actionable insights.
               Always respond with pure JSON in this exact format: {"trend": "string", "recommendation": "BUY"|"SELL"|"HOLD", "reasoning": "string", "targetPrice": number, "confidence": number}`,
      prompt: `
        Product: ${productName} (SKU: ${sku})
        Price history (last 30 days): ${JSON.stringify(priceHistory)}
        User's purchase price: ${currentInventory?.purchasePrice}
        Current lowest ask on StockX: ${priceHistory?.stockx?.at(-1)?.askPrice}
        
        Provide a price trend analysis and buy/sell recommendation based on the data.
      `,
    });

    // Try to parse the JSON response from LLM
    let parsedJson;
    try {
      // In case the LLM wrapped it in markdown code blocks
      const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedJson = JSON.parse(jsonStr);
    } catch (err) {
      console.error("Failed to parse LLM JSON response:", text);
      return new Response(JSON.stringify({ error: "Failed to parse AI response" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify(parsedJson), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("AI Insight Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
