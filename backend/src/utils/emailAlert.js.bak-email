const nodemailer = require("nodemailer");

const EMAIL_ENABLED = process.env.EMAIL_ALERTS_ENABLED === "true";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ALERT_EMAIL_USER,
    pass: process.env.ALERT_EMAIL_PASS,
  },
});

async function sendSecurityAlert(subject, text) {
  try {
    if (!EMAIL_ENABLED) {
      console.log("Email alerts are disabled.");
      return { success: false, message: "Email alerts disabled" };
    }

    if (!process.env.ALERT_EMAIL_USER || !process.env.ALERT_EMAIL_PASS || !process.env.ALERT_EMAIL_TO) {
      console.log("Email alert environment variables are missing.");
      return { success: false, message: "Missing email env vars" };
    }

    const info = await transporter.sendMail({
      from: process.env.ALERT_EMAIL_USER,
      to: process.env.ALERT_EMAIL_TO,
      subject,
      text,
    });

    console.log("Security alert email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send security alert email:", error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { sendSecurityAlert };
