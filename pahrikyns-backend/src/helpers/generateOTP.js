const nodemailer = require("nodemailer");

// Generate 6-digit OTP
function generateOTP(length = 6) {
  const chars = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }
  return otp;
}

// Send OTP to email
async function sendOTPEmail(email) {
  const otp = generateOTP();

  const mailHost = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const mailPort = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT || 587);
  const mailUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const mailPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const mailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER || mailUser;

  if (!mailHost || !mailUser || !mailPass) {
    throw new Error("SMTP is not configured (host/user/pass missing)");
  }

  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    // Port 465 expects implicit TLS. Others usually use STARTTLS.
    secure: mailPort === 465,
    auth: {
      user: mailUser,
      pass: mailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: mailFrom,
    to: email,
    subject: "Your OTP Verification Code",
    html: `
      <h2>Your OTP Code</h2>
      <p style="font-size: 20px;"><b>${otp}</b></p>
      <p>Valid for 5 minutes.</p>
    `,
  });

  return otp;
}

module.exports = {
  generateOTP,
  sendOTPEmail,
};
