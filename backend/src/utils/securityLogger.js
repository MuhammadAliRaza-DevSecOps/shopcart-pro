const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../../logs");
const logFile = path.join(logDir, "security.log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function writeSecurityLog(eventType, message, extra = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    eventType,
    message,
    ...extra
  };

  fs.appendFileSync(logFile, JSON.stringify(logEntry) + "\n", "utf8");
}

module.exports = { writeSecurityLog };