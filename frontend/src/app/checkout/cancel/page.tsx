"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { SectionLayout } from '@/components/layout';
import { typography, spacing, buttonClasses } from '@/styles';

export default function CheckoutCancelPage() {
  return (
    <SectionLayout backgroundVariant="default" contentAlignment="center" minHeight="min-h-screen">
      <div className={`${spacing.maxWidth.small} text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-8"
        >
          {/* Warning Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${typography.heading.medium} mb-4 text-yellow-400`}
          >
            Payment Cancelled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${typography.body.medium} mb-6 text-gray-300`}
          >
            Your payment was cancelled. No charges have been made to your account.
            You can try again whenever you're ready.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <Link href="/checkout" className="block">
              <Button variant="primary" className={`${buttonClasses.base} w-full`}>
                Try Again
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="secondary" className={`${buttonClasses.base} w-full`}>
                Return to Home
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-4 bg-gray-900 rounded-lg"
          >
            <h3 className={`${typography.heading.small} mb-2 text-[var(--accent-color)]`}>
              Need Help?
            </h3>
            <p className={`${typography.body.small} text-gray-300 mb-2`}>
              If you're experiencing issues with the checkout process, please contact our support team.
            </p>
            <Link href="/contact" className="text-[var(--accent-color)] hover:underline">
              Contact Support
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </SectionLayout>
  );
}
