"use client";

import React from 'react';
import { typography } from '@/styles';

interface TestCardInfoProps {
  className?: string;
  variant?: 'compact' | 'full';
}

const TEST_CARDS = [
  {
    type: 'success',
    label: '✅ Successful Payment',
    number: '4242424242424242',
    display: '4242 4242 4242 4242',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    codeColor: 'bg-green-100 text-green-900'
  },
  {
    type: 'declined',
    label: '❌ Declined Card',
    number: '4000000000000002',
    display: '4000 0000 0000 0002',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    codeColor: 'bg-red-100 text-red-900'
  },
  {
    type: 'insufficient',
    label: '💰 Insufficient Funds',
    number: '4000000000009995',
    display: '4000 0000 0000 9995',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    codeColor: 'bg-orange-100 text-orange-900'
  },
  {
    type: '3dsecure',
    label: '🔒 3D Secure Required',
    number: '4000000000003220',
    display: '4000 0000 0000 3220',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    codeColor: 'bg-purple-100 text-purple-900'
  }
];

export default function TestCardInfo({ className = '', variant = 'full' }: TestCardInfoProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

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
      <h4 className={`${typography.body.medium} font-semibold text-blue-900 mb-3`}>
        💳 Test Card Details
      </h4>
      
      {/* Common Details */}
      <div className="mb-4 p-3 bg-blue-100 rounded">
        <h5 className="font-medium text-blue-900 mb-2">Use for all cards:</h5>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700">Expiry:</span>
            <code 
              className="bg-white px-2 py-1 rounded text-blue-900 select-all cursor-pointer"
              onClick={() => copyToClipboard('09/29')}
            >
              09/29
            </code>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">CVV:</span>
            <code 
              className="bg-white px-2 py-1 rounded text-blue-900 select-all cursor-pointer"
              onClick={() => copyToClipboard('123')}
            >
              123
            </code>
          </div>
        </div>
      </div>

      {/* Test Cards */}
      <div className="space-y-3">
        {TEST_CARDS.map((card) => (
          <div key={card.type} className={`p-3 ${card.bgColor} border ${card.borderColor} rounded`}>
            <div className="flex justify-between items-center">
              <span className={`${card.textColor} font-medium`}>{card.label}:</span>
              <code 
                className={`${card.codeColor} px-2 py-1 rounded select-all cursor-pointer`}
                onClick={() => copyToClipboard(card.number)}
              >
                {card.display}
              </code>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-blue-600 mt-3 text-center">
        💡 Click on any card number to copy to clipboard
      </p>
    </div>
  );
}
