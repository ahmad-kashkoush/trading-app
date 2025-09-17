"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { SectionLayout } from '@/components/layout';
import { typography, spacing, buttonClasses } from '@/styles';
import apiPayment from '@/services/apiPayment';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      verifySession();
    } else {
      setError('No session ID found');
      setLoading(false);
    }
  }, [sessionId]);

  const verifySession = async () => {
    try {
      const response = await apiPayment.verifySession(sessionId!);
      if (response.success) {
        setSession(response.session);
      } else {
        setError(response.error || 'Failed to verify payment');
      }
    } catch (err) {
      setError('Failed to verify payment');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SectionLayout backgroundVariant="default" contentAlignment="center" minHeight="min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-color)] mx-auto mb-4"></div>
          <p className={typography.body.medium}>Verifying your payment...</p>
        </div>
      </SectionLayout>
    );
  }

  if (error) {
    return (
      <SectionLayout backgroundVariant="default" contentAlignment="center" minHeight="min-h-screen">
        <div className={`${spacing.maxWidth.small} text-center`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-500 rounded-lg p-8"
          >
            <h1 className={`${typography.heading.medium} mb-4 text-red-400`}>
              Payment Verification Failed
            </h1>
            <p className={`${typography.body.medium} mb-6 text-gray-300`}>
              {error}
            </p>
            <Link href="/checkout">
              <Button variant="primary" className={buttonClasses.base}>
                Try Again
              </Button>
            </Link>
          </motion.div>
        </div>
      </SectionLayout>
    );
  }

  return (
    <SectionLayout backgroundVariant="default" contentAlignment="center" minHeight="min-h-screen">
      <div className={`${spacing.maxWidth.small} text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-green-900/20 border border-green-500 rounded-lg p-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${typography.heading.medium} mb-4 text-green-400`}
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${typography.body.medium} mb-6 text-gray-300`}
          >
            Thank you for your purchase. Your trading package is now active and ready to use.
          </motion.p>

          {session && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 rounded-lg p-4 mb-6 text-left"
            >
              <h3 className={`${typography.heading.small} mb-3 text-[var(--accent-color)]`}>
                Order Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={typography.body.small}>Amount:</span>
                  <span className={`${typography.body.small} font-semibold`}>
                    ${(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={typography.body.small}>Payment Status:</span>
                  <span className={`${typography.body.small} text-green-400 font-semibold`}>
                    {session.payment_status}
                  </span>
                </div>
                {session.customer_email && (
                  <div className="flex justify-between">
                    <span className={typography.body.small}>Email:</span>
                    <span className={typography.body.small}>
                      {session.customer_email}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <Link href="/dashboard" className="block">
              <Button variant="primary" className={`${buttonClasses.base} w-full`}>
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="secondary" className={`${buttonClasses.base} w-full`}>
                Return to Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </SectionLayout>
  );
}
