# Checkout Button Testing Guide

## Overview
A simple checkout button has been added to the home page that integrates with Stripe for payment processing.

## What's Implemented

1. **CheckoutButton Component** (`/frontend/src/components/CheckoutButton.tsx`)
   - Simple, reusable checkout button
   - Handles payment session creation
   - Shows loading state during processing
   - Redirects to Stripe Checkout

2. **Home Page Integration** (`/frontend/src/app/page.tsx`)
   - Added checkout button next to "Explore HOOD Month" button
   - Product: "Premium Trading Access" - $29.99

3. **Success/Cancel Pages**
   - `/payment/success` - Shows success message after payment
   - `/payment/cancel` - Shows cancellation message

## Testing with Test Card Numbers

Since this is a test environment, use these Stripe test card numbers:

### Successful Payments
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., `12/34`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

### Other Test Cards
- **Declined Card**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`
- **3D Secure Required**: `4000 0000 0000 3220`

## How to Test

1. Go to the home page (`http://localhost:3000`)
2. Scroll to the first section with the "HOOD Month" content
3. Click the "Buy Now - $29.99" button
4. You'll be redirected to Stripe's checkout page
5. Use the test card numbers above
6. Complete the payment to see the success page
7. Or cancel to see the cancel page

## Backend Configuration

- Using Stripe test keys (starts with `sk_test_`)
- CORS configured for localhost:3000
- Payment routes available at `/api/payment/`

## Features

- Pre-filled test card numbers (no real payments)
- Responsive design matching your theme
- Smooth animations with Framer Motion
- Error handling for failed payments
- Success and cancellation flows
