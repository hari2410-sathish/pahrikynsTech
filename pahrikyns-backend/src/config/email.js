const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || process.env.EMAIL_HOST,
  port: Number(process.env.SMTP_PORT || process.env.EMAIL_PORT),
  secure: (process.env.SMTP_PORT || process.env.EMAIL_PORT) === "465",
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP ERROR:", err);
  } else {
    console.log("✅ SMTP Connected");
  }
});

async function sendMail(to, subject, text, html, attachments = []) {
  try {
    return await transporter.sendMail({
      from: `Pahrikyns <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
      attachments,
    });
  } catch (err) {
    console.error("⚠️ Failed to send mail:", err.message);
    return null;
  }
}

module.exports = { sendMail };
