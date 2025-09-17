"use client"
import React, { useState } from 'react';
import { Button as ThemeButton } from '@/components/ui';
import { buttonClasses, HOVER_ANIMATIONS } from '@/styles';
import { motion } from 'framer-motion';
import apiPayment from '@/services/apiPayment';
import { formatPrice } from '@/utils/packages';

interface CheckoutButtonProps {
  productName?: string;
  amount?: number; // in cents
  description?: string;
  customerEmail?: string;
  userId?: string;
  className?: string;
  showTestInfo?: boolean;
}

export default function CheckoutButton({
  productName = "Premium Trading Package",
  amount = 2999,
  description = "Get access to premium trading features",
  customerEmail,
  userId,
  className = "",
  showTestInfo = true
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await apiPayment.createCheckoutSession({ name: productName, description, amount, customerEmail, userId });
      
      if (response.success && response.url) {
        window.location.href = response.url;
      } else {
        alert('Failed to start checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      {showTestInfo && (
        <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-center">
          <span className="text-xs text-yellow-700 font-medium">🧪 TEST MODE - Use test cards for different payment scenarios</span>
        </div>
      )}
      
      <motion.div whileHover={HOVER_ANIMATIONS.scale} whileTap={HOVER_ANIMATIONS.tap}>
        <ThemeButton
          onClick={handleCheckout}
          disabled={isLoading}
          variant="primary"
          className={`${buttonClasses.base} ${buttonClasses.sizes.large} relative overflow-hidden group ${buttonClasses.effects.shadow}`}
        >
          <span className="relative z-10">{isLoading ? 'Processing...' : `Buy Now - ${formatPrice(amount)}`}</span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </ThemeButton>
      </motion.div>
    </div>
  );
}