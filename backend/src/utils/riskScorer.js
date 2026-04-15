function calculateRisk(eventType, extra = {}) {
  let score = 0;

  switch (eventType) {
    case "UNKNOWN_USER_LOGIN":
      score += 40;
      break;
    case "FAILED_LOGIN":
      score += 15;
      break;
    case "BRUTE_FORCE_DETECTED":
      score += 50;
      break;
    case "HONEYPOT_TRIGGERED":
      score += 60;
      break;
    case "ADMIN_PROMOTION":
      score += 30;
      break;
    default:
      score += 5;
  }

  if (extra.failedCount && extra.failedCount >= 5) {
    score += 20;
  }

  let riskLevel = "LOW";
  if (score >= 60) {
    riskLevel = "HIGH";
  } else if (score >= 30) {
    riskLevel = "MEDIUM";
  }

  return { score, riskLevel };
}

module.exports = { calculateRisk };
