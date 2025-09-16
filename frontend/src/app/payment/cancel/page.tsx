"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button as ThemeButton } from '@/components/ui';
import { buttonClasses, spacing, typography } from '@/styles';
import { animationVariants } from '@/styles/animations';

export default function PaymentCancel() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants.container}
        className="text-center space-y-6 p-8 max-w-md mx-auto"
      >
        <motion.div variants={animationVariants.scale}>
          <div className="w-20 h-20 bg-orange-500 rounded-full mx-auto flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </motion.div>

        <motion.div variants={animationVariants.slideUp} className="space-y-2">
          <h1 className={`${typography.serif} ${typography.heading.large} text-orange-800`}>
            Payment Cancelled
          </h1>
          <p className={`${typography.phonic} ${typography.body.medium} text-orange-700`}>
            No worries! Your payment was cancelled and no charges were made.
          </p>
        </motion.div>

        <motion.div variants={animationVariants.slideUp} className="space-y-4">
          <div className="bg-white/70 rounded-lg p-4">
            <p className={`${typography.phonic} ${typography.body.small} text-gray-600`}>
              You can try again anytime or explore our free features.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <ThemeButton
              component={Link}
              href="/"
              variant="secondary"
              className={`${buttonClasses.base} ${buttonClasses.sizes.medium} flex-1`}
            >
              Return to Home
            </ThemeButton>
            <ThemeButton
              component={Link}
              href="#"
              onClick={() => window.history.back()}
              variant="primary"
              className={`${buttonClasses.base} ${buttonClasses.sizes.medium} ${buttonClasses.effects.shadow} flex-1`}
            >
              Try Again
            </ThemeButton>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
