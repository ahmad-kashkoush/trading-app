"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { typography, spacing, buttonClasses } from '@/styles';
import apiSubscription, { UserSubscription } from '@/services/apiSubscription';

interface SubscriptionStatusProps {
  userId?: string; // User's ID for subscription lookup (preferred)
  userEmail?: string; // User's email as fallback
}

export default function SubscriptionStatus({ userId, userEmail }: SubscriptionStatusProps) {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setLoading(true);
        setError(null);
        // Prefer userId, fallback to userEmail
        const identifier = userId || userEmail;
        if (!identifier || identifier === 'guest') {
          setSubscription({
            hasAccess: false,
            activePackages: []
          });
          setLoading(false);
          return;
        }
        
        const data = await apiSubscription.checkUserAccess(identifier);
        setSubscription(data);
      } catch (err) {
        setError('Failed to load subscription status');
        console.error('Error fetching subscription:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [userId, userEmail]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`${typography.heading.small} text-gray-900`}>
          Subscription Status
        </h3>
        
        {subscription?.hasAccess && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        )}
      </div>

      {subscription?.hasAccess ? (
        <div className="space-y-4">
          {subscription.activePackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-[var(--accent-color)]/10 to-transparent rounded-lg p-4 border-l-4 border-[var(--accent-color)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`${typography.body.medium} font-semibold text-gray-900 mb-1`}>
                    {pkg.package}
                  </h4>
                  <p className={`${typography.body.small} text-gray-600`}>
                    Expires on {new Date(pkg.expiresAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`${typography.body.small} font-medium text-[var(--accent-color)]`}>
                    {pkg.daysRemaining} days left
                  </p>
                  {pkg.daysRemaining <= 7 && (
                    <p className="text-xs text-orange-600 mt-1">
                      Expires soon!
                    </p>
                  )}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[var(--accent-color)] h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.max(5, (pkg.daysRemaining / (pkg.totalDays || 30)) * 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="pt-4 border-t border-gray-100">
            <Link href="/checkout" className="block">
              <Button 
                variant="secondary" 
                className={`${buttonClasses.base} w-full text-sm`}
              >
                Extend or Upgrade Plan
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h4 className={`${typography.heading.small} text-gray-900 mb-2`}>
            No Active Subscription
          </h4>
          <p className={`${typography.body.small} text-gray-600 mb-4`}>
            Get access to premium trading features and advanced analytics.
          </p>
          
          <Link href="/checkout">
            <Button 
              variant="primary" 
              className={`${buttonClasses.base} w-full`}
            >
              Choose a Plan
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
