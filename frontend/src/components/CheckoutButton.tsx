"use client"
import React, { useState } from 'react';
import { Button as ThemeButton } from '@/components/ui';
import { buttonClasses, HOVER_ANIMATIONS } from '@/styles';
import { motion } from 'framer-motion';
import apiPayment from '@/services/apiPayment';

interface CheckoutButtonProps {
  productName?: string;
  amount?: number; // in cents
  description?: string;
  className?: string;
}

/**
 * CheckoutButton Component
 * 
 * A simple checkout button that integrates with Stripe for payment processing.
 * This is configured for testing purposes with Stripe test keys.
 * 
 * Test Card Numbers:
 * - Success: 4242 4242 4242 4242
 * - Declined: 4000 0000 0000 0002
 * - Use any future expiry date and 3-digit CVC
 */
export default function CheckoutButton({ 
  productName = "Premium Trading Package",
  amount = 2999, // $29.99
  description = "Get access to premium trading features",
  className = ""
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      const response = await apiPayment.createCheckoutSession({
        name: productName,
        description,
        amount
      });

      if (response.success && response.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.url;
      } else {
        console.error('Failed to create checkout session');
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
    <motion.div
      whileHover={HOVER_ANIMATIONS.scale}
      whileTap={HOVER_ANIMATIONS.tap}
      className={className}
    >
      <ThemeButton
        onClick={handleCheckout}
        disabled={isLoading}
        variant="primary"
        className={`${buttonClasses.base} ${buttonClasses.sizes.large} relative overflow-hidden group ${buttonClasses.effects.shadow}`}
      >
        <span className="relative z-10">
          {isLoading ? 'Processing...' : `Buy Now - $${(amount / 100).toFixed(2)}`}
        </span>
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </ThemeButton>
    </motion.div>
  );
}
