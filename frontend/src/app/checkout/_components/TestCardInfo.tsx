"use client";

import React from 'react';
import { typography } from '@/styles';

interface TestCardInfoProps {
  className?: string;
  variant?: 'compact' | 'full';
}

const TEST_CARDS = [
  { label: '✅ Successful Payment', number: '4242424242424242', display: '4242 4242 4242 4242', colors: 'bg-green-50 border-green-200 text-green-700' },
  { label: '❌ Declined Card', number: '4000000000000002', display: '4000 0000 0000 0002', colors: 'bg-red-50 border-red-200 text-red-700' },
  { label: '💰 Insufficient Funds', number: '4000000000009995', display: '4000 0000 0000 9995', colors: 'bg-orange-50 border-orange-200 text-orange-700' },
  { label: '🔒 3D Secure Required', number: '4000000000003220', display: '4000 0000 0000 3220', colors: 'bg-purple-50 border-purple-200 text-purple-700' }
];

export default function TestCardInfo({ className = '', variant = 'full' }: TestCardInfoProps) {
  const copy = (text: string) => navigator.clipboard.writeText(text);

  if (variant === 'compact') {
    return (
      <div className={`p-2 bg-yellow-50 border border-yellow-200 rounded text-center ${className}`}>
        <span className="text-xs text-yellow-700 font-medium">
          🧪 TEST MODE - Use test cards for different payment scenarios
        </span>
      </div>
    );
  }

  return (
    <div className={`p-4 bg-blue-50 border border-blue-200 rounded-lg ${className}`}>
      <h4 className={`${typography.body.medium} font-semibold text-blue-900 mb-3`}>💳 Test Card Details</h4>
      
      <div className="mb-4 p-3 bg-blue-100 rounded">
        <h5 className="font-medium text-blue-900 mb-2">Use for all cards:</h5>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700">Expiry:</span>
            <code className="bg-white px-2 py-1 rounded text-blue-900 select-all cursor-pointer" onClick={() => copy('09/29')}>09/29</code>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">CVV:</span>
            <code className="bg-white px-2 py-1 rounded text-blue-900 select-all cursor-pointer" onClick={() => copy('123')}>123</code>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {TEST_CARDS.map((card, i) => (
          <div key={i} className={`p-3 ${card.colors} border rounded`}>
            <div className="flex justify-between items-center">
              <span className="font-medium">{card.label}:</span>
              <code className="bg-white px-2 py-1 rounded select-all cursor-pointer" onClick={() => copy(card.number)}>
                {card.display}
              </code>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-blue-600 mt-3 text-center">💡 Click on any card number to copy to clipboard</p>
    </div>
  );
}
