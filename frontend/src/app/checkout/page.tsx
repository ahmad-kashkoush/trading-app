"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckoutButton } from '@/components';
import { SectionLayout, SectionHeader } from '@/components/layout';
import { typography, spacing, buttonClasses, HOVER_ANIMATIONS } from '@/styles';

// Product options for the checkout
const PRODUCTS = [
  {
    id: 'basic',
    name: 'Basic Trading Package',
    price: 2999, // $29.99
    description: 'Essential trading tools and basic analytics',
    features: [
      'Real-time market data',
      'Basic charting tools',
      'Email alerts',
      'Mobile app access'
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
      'API access'
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
      'Dedicated account manager'
    ]
  }
];

export default function CheckoutPage() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[1]); // Default to Premium

  return (
    <SectionLayout 
      backgroundVariant="default" 
      contentAlignment="center"
      minHeight="min-h-screen"
      showDecorations={true}
    >
      {/* Header */}
      <SectionHeader
        title="Choose Your Trading Package"
        description="Select the perfect trading package for your needs and start your journey to financial success."
        alignment="center"
      />

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={HOVER_ANIMATIONS.scale}
              className={`
                relative p-6 rounded-lg border transition-all duration-300 cursor-pointer
                ${selectedProduct.id === product.id
                  ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/5'
                  : 'border-gray-800 hover:border-gray-600'
                }
              `}
              onClick={() => setSelectedProduct(product)}
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[var(--accent-color)] text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h3 className={`${typography.heading.small} mb-2`}>
                  {product.name}
                </h3>
                <p className={`${typography.body.medium} ${typography.colors.grayLight} mb-4`}>
                  {product.description}
                </p>
                <div className="text-3xl font-bold text-[var(--accent-color)]">
                  ${(product.price / 100).toFixed(2)}
                  <span className="text-sm text-gray-400 ml-1">/ month</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {product.features.map((feature, idx) => (
                  <li key={idx} className={`${typography.body.small} flex items-center`}>
                    <span className="text-[var(--accent-color)] mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Selected Product Summary & Checkout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto bg-gray-900 rounded-lg p-6 border border-gray-800"
        >
          <h3 className={`${typography.heading.small} mb-4 text-center`}>
            Order Summary
          </h3>
          
          <div className="border-b border-gray-800 pb-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <span className={typography.body.medium}>{selectedProduct.name}</span>
              <span className="font-semibold">${(selectedProduct.price / 100).toFixed(2)}</span>
            </div>
            <p className={`${typography.body.small} ${typography.colors.grayLight}`}>
              {selectedProduct.description}
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className={`${typography.body.medium} font-semibold`}>Total</span>
            <span className="text-xl font-bold text-[var(--accent-color)]">
              ${(selectedProduct.price / 100).toFixed(2)}
            </span>
          </div>

          <CheckoutButton
            productName={selectedProduct.name}
            amount={selectedProduct.price}
            description={selectedProduct.description}
            className="w-full"
          />

          <p className={`${typography.body.small} ${typography.colors.grayLight} text-center mt-4`}>
            Secure payment powered by Stripe. Cancel anytime.
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center items-center space-x-8 mt-12"
        >
          <div className="flex items-center space-x-2">
            <span className="text-[var(--accent-color)]">🔒</span>
            <span className={`${typography.body.small} ${typography.colors.grayLight}`}>
              SSL Encrypted
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[var(--accent-color)]">💳</span>
            <span className={`${typography.body.small} ${typography.colors.grayLight}`}>
              Secure Payments
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[var(--accent-color)]">↩️</span>
            <span className={`${typography.body.small} ${typography.colors.grayLight}`}>
              30-Day Refund
            </span>
          </div>
        </motion.div>
    </SectionLayout>
  );
}
