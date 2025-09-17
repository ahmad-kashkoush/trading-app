"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button as ThemeButton } from '@/components/ui';
import { buttonClasses, spacing, typography, COLORS } from '@/styles';
import { animationVariants } from '@/styles/animations';

export default function PaymentSuccess() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants.container}
        className="text-center space-y-6 p-8 max-w-md mx-auto"
      >
        <motion.div variants={animationVariants.scale}>
          <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>

        <motion.div variants={animationVariants.slideUp} className="space-y-2">
          <h1 className={`${typography.serif} ${typography.heading.large} text-green-800`}>
            Payment Successful!
          </h1>
          <p className={`${typography.phonic} ${typography.body.medium} text-green-700`}>
            Thank you for your purchase. Your premium trading access has been activated.
          </p>
        </motion.div>

        <motion.div variants={animationVariants.slideUp} className="space-y-4">
          <div className="bg-white/70 rounded-lg p-4">
            <p className={`${typography.phonic} ${typography.body.small} text-gray-600`}>
              You will receive a confirmation email shortly with your receipt and access details.
            </p>
          </div>

          <ThemeButton
            component={Link}
            href="/"
            variant="primary"
            className={`${buttonClasses.base} ${buttonClasses.sizes.medium} ${buttonClasses.effects.shadow} w-full`}
          >
            Return to Home
          </ThemeButton>
        </motion.div>
      </motion.div>
    </main>
  );
}
