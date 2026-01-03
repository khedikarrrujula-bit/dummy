import analyzeFraudTone from "@/lib/fraudTone";
import analyzeAIVoice from "@/lib/aiVoice";

export const runtime = "edge";

export async function POST(req) {
  // Placeholder transcript (replace with Whisper later)
  const transcript =
    "I guarantee this will work, you can trust me completely, there is no risk involved.";

  const fraud = analyzeFraudTone(transcript);
  const aiVoice = analyzeAIVoice();

  return new Response(
    JSON.stringify({
      transcript,
      fraudRisk: fraud.level,
      fraudScore: fraud.score,
      reasons: fraud.reasons,
      aiVoice
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
