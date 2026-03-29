// src/config/pricing.js

const DEFAULT_TOOL_PRICES = {
  aws: 3, // Default for AWS if unknown
  os: 1,  // Default for OS
  devops: 5 // Default for DevOps if unknown
};

const SPECIFIC_TOOL_PRICES = {
  devops: {
    github: 5,
    jenkins: 6,
    docker: 6,
    kubernetes: 10,
  }
};

/**
 * Get base price for 1 month of a tool.
 * @param {string} category 
 * @param {string} tool 
 * @returns {number}
 */
function getBasePrice(category, tool) {
  const cat = category.toLowerCase();
  const t = tool.toLowerCase();

  if (SPECIFIC_TOOL_PRICES[cat] && SPECIFIC_TOOL_PRICES[cat][t]) {
    return SPECIFIC_TOOL_PRICES[cat][t];
  }

  // Fallback to category defaults
  if (DEFAULT_TOOL_PRICES[cat]) {
    return DEFAULT_TOOL_PRICES[cat];
  }

  // Absolute default
  return 5;
}

/**
 * Calculate final price based on duration plan
 */
function calculateFinalPrice(basePrice, planType) {
  switch (planType) {
    case '1-month': return basePrice;
    case '3-months': return basePrice * 3 * 0.9; // 10% discount
    case '6-months': return basePrice * 6 * 0.8; // 20% discount
    case 'lifetime': return basePrice * 12;      // 1-year equivalent for lifetime
    default: return basePrice;
  }
}

/**
 * Calculate expiration date based on plan
 */
function calculateExpirationDate(planType) {
  const now = new Date();
  if (planType === 'lifetime') return null; // No expiration

  const expiry = new Date(now);
  if (planType === '1-month') expiry.setMonth(now.getMonth() + 1);
  if (planType === '3-months') expiry.setMonth(now.getMonth() + 3);
  if (planType === '6-months') expiry.setMonth(now.getMonth() + 6);
  
  return expiry;
}

module.exports = {
  getBasePrice,
  calculateFinalPrice,
  calculateExpirationDate
};
