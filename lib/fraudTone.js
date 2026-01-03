export default function analyzeFraudTone(text) {
  let score = 0;
  const reasons = [];

  const certaintyWords = ["guarantee", "100%", "definitely", "no risk"];
  const persuasionWords = ["trust me", "believe me"];
  const vagueWords = ["something", "things", "stuff"];

  certaintyWords.forEach(w => {
    if (text.toLowerCase().includes(w)) {
      score += 20;
      reasons.push(`Over-certainty detected ("${w}")`);
    }
  });

  persuasionWords.forEach(w => {
    if (text.toLowerCase().includes(w)) {
      score += 25;
      reasons.push(`Persuasive pressure ("${w}")`);
    }
  });

  vagueWords.forEach(w => {
    if (text.toLowerCase().includes(w)) {
      score += 10;
      reasons.push(`Vague language ("${w}")`);
    }
  });

  if (text.length > 120) {
    score += 10;
    reasons.push("Over-structured / scripted speech");
  }

  let level = "LOW";
  if (score > 60) level = "HIGH";
  else if (score > 30) level = "MEDIUM";

  return {
    score: Math.min(score, 100),
    level,
    reasons
  };
}
