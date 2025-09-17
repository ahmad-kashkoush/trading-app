// Product configurations for the trading packages
export const TRADING_PACKAGES = [
  {
    id: 'basic',
    name: 'Basic Trading Package',
    price: 2999, // $29.99
    description: 'Essential trading tools and basic analytics',
    features: [
      'Real-time market data',
      'Basic charting tools',
      'Email alerts',
      'Mobile app access',
      '✨ 30-day access'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Trading Package',
    price: 4999, // $49.99
    description: 'Advanced trading tools with premium features',
    features: [
      'Everything in Basic',
      'Advanced analytics',
      'Custom indicators',
      'Priority support',
      'API access',
      '✨ 30-day access'
    ],
    popular: true
  },
  {
    id: 'pro',
    name: 'Professional Trading Package',
    price: 9999, // $99.99
    description: 'Complete trading suite for professionals',
    features: [
      'Everything in Premium',
      'AI-powered insights',
      'Unlimited alerts',
      'White-label solutions',
      'Dedicated account manager',
      '✨ 30-day access'
    ]
  }
] as const;

// Default package configuration
export const DEFAULT_PACKAGE = TRADING_PACKAGES[1]; // Premium

// Access period configuration
export const ACCESS_PERIOD_DAYS = 30;

// Package utilities
export const formatPrice = (price: number): string => {
  return `$${(price / 100).toFixed(2)}`;
};

export const getPackageById = (id: string) => {
  return TRADING_PACKAGES.find(pkg => pkg.id === id) || DEFAULT_PACKAGE;
};
