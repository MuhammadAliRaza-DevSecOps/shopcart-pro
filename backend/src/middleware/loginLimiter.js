const rateLimit = require("express-rate-limit");
const { writeSecurityLog } = require("../utils/securityLogger");
const { sendSecurityAlert } = require("../utils/emailAlert");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again after 15 minutes."
  },
  handler: async (req, res) => {
    writeSecurityLog("RATE_LIMIT_TRIGGERED", "Too many login attempts detected", {
      ip: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
      path: req.originalUrl
    });

    await sendSecurityAlert(
      "Shopcart Security Alert: Rate Limit Triggered",
      `Too many login attempts were detected.\n\nIP: ${req.ip}\nPath: ${req.originalUrl}\nUser-Agent: ${req.headers["user-agent"] || "unknown"}`
    );

    return res.status(429).json({
      message: "Too many login attempts. Please try again after 15 minutes."
    });
  }
});

module.exports = { loginLimiter };
