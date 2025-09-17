"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react";
import { CheckoutButton } from '@/components';
import TestCardInfo from './_components/TestCardInfo';
import { SectionLayout, SectionHeader } from '@/components/layout';
import { typography, spacing, buttonClasses, HOVER_ANIMATIONS } from '@/styles';
import { TRADING_PACKAGES, formatPrice } from '@/utils/packages';

export default function CheckoutPage() {
  const [selectedProduct, setSelectedProduct] = useState(TRADING_PACKAGES[1]); // Default to Premium
  const { data: session } = useSession();

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
          {TRADING_PACKAGES.map((product, index) => (
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
                  {formatPrice(product.price)}
                  <span className="text-sm text-gray-400 ml-1">for 30 days</span>
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
              <span className="font-semibold">{formatPrice(selectedProduct.price)}</span>
            </div>
            <p className={`${typography.body.small} ${typography.colors.grayLight}`}>
              {selectedProduct.description} • One-time payment for 30 days
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className={`${typography.body.medium} font-semibold`}>Total (one-time)</span>
            <span className="text-xl font-bold text-[var(--accent-color)]">
              {formatPrice(selectedProduct.price)}
            </span>
          </div>

          <CheckoutButton
            productName={selectedProduct.name}
            amount={selectedProduct.price}
            description={selectedProduct.description}
            customerEmail={session?.user?.email || undefined}
            userId={session?.user?.id || undefined}
            className="w-full"
            showTestInfo={false} // Don't show compact version here
          />

          {/* Full Test Card Information */}
          <TestCardInfo className="mt-4" />

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
