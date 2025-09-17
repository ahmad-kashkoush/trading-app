"use client";

import React from 'react';
import PaymentResultLayout from '../_components/PaymentResultLayout';
import { typography } from '@/styles';

export default function CheckoutCancelPage() {
  return (
    <PaymentResultLayout
      type="cancel"
      title="Payment Cancelled"
      description="Your payment was cancelled. No charges have been made to your account. You can try again whenever you're ready."
      icon={<svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>}
      buttons={[
        { label: "Try Again", href: "/checkout", variant: "primary" },
        { label: "Return to Home", href: "/", variant: "secondary" }
      ]}
      additionalContent={
        <div className="mt-8 p-4 bg-gray-900 rounded-lg">
          <h3 className={`${typography.heading.small} mb-2 text-[var(--accent-color)]`}>Need Help?</h3>
          <p className={`${typography.body.small} text-gray-300 mb-2`}>
            If you're experiencing issues with the checkout process, please contact our support team.
          </p>
          <a href="/contact" className="text-[var(--accent-color)] hover:underline">Contact Support</a>
        </div>
      }
    />
  );
}
