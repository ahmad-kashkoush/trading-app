"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentResultLayout from '../_components/PaymentResultLayout';
import { typography } from '@/styles';
import apiPayment from '@/services/apiPayment';

export default function CheckoutSuccessPage() {
  const sessionId = useSearchParams().get('session_id');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verify = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setLoading(false);
        return;
      }
      
      try {
        const response = await apiPayment.verifySession(sessionId);
        response.success ? setSession(response.session) : setError(response.error || 'Failed to verify payment');
      } catch {
        setError('Failed to verify payment');
      } finally {
        setLoading(false);
      }
    };
    
    verify();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-color)] mx-auto mb-4"></div>
          <p className={typography.body.medium}>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <PaymentResultLayout
        type="error"
        title="Payment Verification Failed"
        description={error}
        icon={<svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
        buttons={[{ label: "Try Again", href: "/checkout", variant: "primary" }]}
      />
    );
  }

  const orderDetails = session && (
    <div className="bg-gray-900 rounded-lg p-4 text-left">
      <h3 className={`${typography.heading.small} mb-3 text-[var(--accent-color)]`}>Order Details</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className={typography.body.small}>Amount:</span>
          <span className={`${typography.body.small} font-semibold`}>${(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span className={typography.body.small}>Status:</span>
          <span className={`${typography.body.small} text-green-400 font-semibold`}>{session.payment_status}</span>
        </div>
        {session.customer_email && (
          <div className="flex justify-between">
            <span className={typography.body.small}>Email:</span>
            <span className={typography.body.small}>{session.customer_email}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <PaymentResultLayout
      type="success"
      title="Payment Successful!"
      description="Thank you for your purchase. Your trading package is now active and ready to use."
      icon={<svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
      buttons={[
        { label: "Go to Dashboard", href: "/dashboard", variant: "primary" },
        { label: "Return to Home", href: "/", variant: "secondary" }
      ]}
      additionalContent={orderDetails}
    />
  );
}
