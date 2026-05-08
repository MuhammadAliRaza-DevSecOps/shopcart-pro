const nodemailer = require("nodemailer");

const EMAIL_ENABLED = process.env.EMAIL_ALERTS_ENABLED === "true";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ALERT_EMAIL_USER,
    pass: process.env.ALERT_EMAIL_PASS,
  },
});

/* Safely escape dynamic values before putting them in HTML */
function escapeHtml(value) {
  return String(value || "Unknown")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* Extract useful fields from the old text body without breaking existing calls */
function parseAlertText(text) {
  const safeText = String(text || "");

  const ipMatch = safeText.match(/IP\s*:\s*(.*)/i);
  const pathMatch = safeText.match(/Path\s*:\s*(.*)/i);
  const uaMatch = safeText.match(/User-Agent\s*:\s*(.*)/i);

  return {
    ip: ipMatch ? ipMatch[1].trim().replace("::ffff:", "") : "Unknown",
    path: pathMatch ? pathMatch[1].trim() : "Unknown",
    userAgent: uaMatch ? uaMatch[1].trim() : "Unknown",
    rawText: safeText,
  };
}

function buildSecurityAlertHtml(subject, text) {
  const alert = parseAlertText(text);

  const ip = escapeHtml(alert.ip);
  const path = escapeHtml(alert.path);
  const userAgent = escapeHtml(alert.userAgent);
  const time = escapeHtml(new Date().toLocaleString());
  const rawText = escapeHtml(alert.rawText).replace(/\n/g, "<br>");

  return `
  <div style="margin:0;padding:0;background:#0b1020;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
    <div style="max-width:760px;margin:0 auto;padding:32px 18px;">
      
      <div style="background:#111827;border:1px solid #263656;border-radius:18px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,0.35);">
        
        <div style="background:linear-gradient(135deg,#ef4444,#f59e0b);padding:24px;text-align:center;">
          <div style="font-size:34px;line-height:1;">🚨</div>
          <h1 style="margin:10px 0 4px;font-size:26px;letter-spacing:0.5px;color:#ffffff;">
            ShopCart Pro Security Alert
          </h1>
          <p style="margin:0;color:#fff7ed;font-size:14px;">
            Suspicious login activity detected by the security monitoring system
          </p>
        </div>

        <div style="padding:28px;">
          <div style="display:inline-block;background:#7f1d1d;color:#fecaca;border:1px solid #ef4444;border-radius:999px;padding:7px 13px;font-size:12px;font-weight:bold;letter-spacing:0.4px;text-transform:uppercase;">
            High Priority Alert
          </div>

          <h2 style="color:#facc15;margin:18px 0 10px;font-size:22px;">
            Multiple Failed Login Attempts Detected
          </h2>

          <p style="line-height:1.7;color:#d1d5db;margin:0 0 22px;">
            ShopCart Pro detected repeated failed login attempts. This may indicate credential guessing,
            brute-force activity, or unauthorized access behavior. The event has been logged for monitoring
            and review.
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:18px;font-size:14px;">
            <tr>
              <td style="width:34%;padding:13px;border:1px solid #2b3650;background:#0f172a;color:#cbd5e1;"><b>🌐 IP Address</b></td>
              <td style="padding:13px;border:1px solid #2b3650;color:#ffffff;">${ip}</td>
            </tr>
            <tr>
              <td style="padding:13px;border:1px solid #2b3650;background:#0f172a;color:#cbd5e1;"><b>📍 Endpoint</b></td>
              <td style="padding:13px;border:1px solid #2b3650;color:#ffffff;">${path}</td>
            </tr>
            <tr>
              <td style="padding:13px;border:1px solid #2b3650;background:#0f172a;color:#cbd5e1;"><b>🖥 User Agent</b></td>
              <td style="padding:13px;border:1px solid #2b3650;color:#ffffff;word-break:break-word;">${userAgent}</td>
            </tr>
            <tr>
              <td style="padding:13px;border:1px solid #2b3650;background:#0f172a;color:#cbd5e1;"><b>⏰ Detection Time</b></td>
              <td style="padding:13px;border:1px solid #2b3650;color:#ffffff;">${time}</td>
            </tr>
          </table>

          <div style="margin-top:24px;padding:18px;background:#1b2335;border-left:5px solid #ef4444;border-radius:10px;">
            <b style="color:#ffffff;">Recommended Action</b>
            <ul style="margin:10px 0 0;padding-left:20px;line-height:1.8;color:#d1d5db;">
              <li>Review the login activity and confirm whether it was authorized.</li>
              <li>Check Wazuh, Prometheus, and Grafana dashboards for related events.</li>
              <li>Reset credentials if the activity looks suspicious.</li>
              <li>Continue monitoring for repeated attempts from the same IP address.</li>
            </ul>
          </div>

          <details style="margin-top:22px;background:#0f172a;border:1px solid #263656;border-radius:10px;padding:14px;color:#cbd5e1;">
            <summary style="cursor:pointer;color:#facc15;font-weight:bold;">Raw Event Details</summary>
            <div style="margin-top:12px;font-size:13px;line-height:1.6;color:#d1d5db;">${rawText}</div>
          </details>
        </div>

        <div style="background:#0f1726;padding:17px;text-align:center;color:#94a3b8;font-size:13px;">
          ShopCart Pro Security Monitoring • Wazuh • Prometheus • Grafana
        </div>
      </div>
    </div>
  </div>
  `;
}

async function sendSecurityAlert(subject, text) {
  try {
    if (!EMAIL_ENABLED) {
      console.log("Email alerts are disabled.");
      return { success: false, message: "Email alerts disabled" };
    }

    if (
      !process.env.ALERT_EMAIL_USER ||
      !process.env.ALERT_EMAIL_PASS ||
      !process.env.ALERT_EMAIL_TO
    ) {
      console.log("Email alert environment variables are missing.");
      return { success: false, message: "Missing email env vars" };
    }

    const html = buildSecurityAlertHtml(subject, text);

    const info = await transporter.sendMail({
      from: `"ShopCart Pro Security" <${process.env.ALERT_EMAIL_USER}>`,
      to: process.env.ALERT_EMAIL_TO,
      subject: subject || "🚨 ShopCart Pro Security Alert",
      text,
      html,
    });

    console.log("Security alert email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send security alert email:", error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { sendSecurityAlert };