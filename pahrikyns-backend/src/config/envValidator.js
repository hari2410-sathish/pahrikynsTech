/**
 * Environment Variable Validation
 * Ensures all required environment variables are set at application startup
 */

const requiredEnvVars = [
  'JWT_SECRET',
  'DATABASE_URL',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'SESSION_SECRET',
];

function validateEnvironment() {
  const missing = [];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    const errorMsg = `Missing required environment variables:\n${missing.map((v) => `  - ${v}`).join('\n')}`;
    console.error(`❌ ${errorMsg}`);
    process.exit(1);
  }

  console.log('✅ Environment variables validated successfully');
}

module.exports = validateEnvironment;
