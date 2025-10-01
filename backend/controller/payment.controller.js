const { Transaction } = require("mongodb");
const { Product } = require("../Models/product");
const connectStripe = require("../utils/stripe");
const Transactionn = require("../Models/transaction");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/globalError");
// Create Checkout Session
const checkout = asyncHandler(async (req, res) => {
  const stripe = connectStripe();
  // request body: userId, productId, quantity. 
  // I can get current userId from getCurrent middleware.
  const { userId, productId, quantity } = req.body;

  // Find product by ID from your database
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }
  // create session with product details
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: product.currency || 'usd',
          product_data: {
            name: product.name,
            // description
          },
          unit_amount: Math.round(Number(product.price) * 100), // Convert dollars to cents
        },
        quantity: quantity || 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/cancel`,
  });
  // create transaction record using session, userId, and product. 
  const transaction = {
    sessionId: session.id,
    userId,
    productId: product._id,
    amount: session.amount_total,
    currency: session.currency,
    status: 'pending',
    billingCycle: request.body?.billingCycle || 'one-time'

  };
  // add transaction to db
  const transactionRecord = await Transactionn.create(transaction);

  res.json({
    success: true,
    sessionId: session.id,
    url: session.url,
  });

});

// Verify Payment Session
const verify = asyncHandler(async (req, res) => {
  const stripe = connectStripe();
  const { sessionId } = req.params;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  // res.json({session})
  if (session.payment_status === 'paid') {
    // update transaction.
    const updatedTransaction = await Transactionn.findOneAndUpdate(
      { sessionId },
      { status: session.payment_status },
      { new: true }
    );
    // if subscription product, create userSubscription record.
    const product = await Product.findById(updatedTransaction.productId);
    if (product && product.type === 'subscription') {
      const UserSubscription = require('../Models/userSubscription');
      const newSubscription = new UserSubscription({
        transactionId: updatedTransaction._id,
        userId: updatedTransaction.userId,
        productId: updatedTransaction.productId,
        startDate: new Date(),
        billingCycle: updatedTransaction.billingCycle, // or 'yearly' based on your product
        status: 'active'
      });
      await newSubscription.save();
    }
  }
  res.json({
    success: true,
    message: session.payment_status ? "Successfully completed payment" : "Payment not completed",
    session: {
      id: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
    }
  });
  // } catch (error) {
  //   console.error('Error verifying session:', error);
  //   res.status(500).json({
  //     success: false,
  //     error: error.message
  //   });
  // }
});

module.exports = {
  checkout,
  verify,
};