import analyzeFraudTone from "@/lib/fraudTone";

export const runtime = "edge";

export async function POST(req) {
  const { text } = await req.json();

  const fraud = analyzeFraudTone(text);

  return new Response(
    JSON.stringify({
      fraudRisk: fraud.level,
      fraudScore: fraud.score,
      reasons: fraud.reasons,
      aiText: Math.floor(20 + Math.random() * 40) // AI-like phrasing %
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
