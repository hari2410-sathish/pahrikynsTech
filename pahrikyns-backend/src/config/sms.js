require('dotenv').config();

let client = null;

// Only create Twilio client if SID starts with AC
if (
  process.env.TWILIO_ACCOUNT_SID &&
  process.env.TWILIO_ACCOUNT_SID.startsWith("AC")
) {
  const twilio = require('twilio');
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

async function sendSms(to, body) {
  if (!client) {
    console.log("SMS disabled. No valid Twilio credentials.");
    return null;
  }

  return client.messages.create({
    body,
    from: process.env.TWILIO_FROM,
    to,
  });
}

module.exports = { sendSms };
