// Transaction status constants
const TRANSACTION_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  CANCELED: 'canceled',
  EXPIRED: 'expired'
};

// Currency constants
const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP'
};

// Payment limits (in cents)
const PAYMENT_LIMITS = {
  MIN_AMOUNT: 1, // $1.00
  MAX_AMOUNT: 1000000, // $10,000.00
};

// Default values
const DEFAULTS = {
  ACCESS_PERIOD_DAYS: process.env.DEFAULT_ACCESS_PERIOD_DAYS || 30,
  CURRENCY: process.env.DEFAULT_CURRENCY || CURRENCIES.USD
};

module.exports = {
  TRANSACTION_STATUS,
  CURRENCIES,
  PAYMENT_LIMITS,
  DEFAULTS
};
