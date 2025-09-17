const connectStripe = require("../utils/stripe");
const Transaction = require("../Models/transaction");
const mongoose = require("mongoose");

// Create Checkout Session
const createCheckoutSession = async (req, res) => {
  try {
    const stripe = connectStripe();
    const { priceData, successUrl, cancelUrl } = req.body;

    // Default values for testing
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: priceData?.name || 'Test Product',
              description: priceData?.description || 'Test payment with Stripe',
            },
            unit_amount: priceData?.amount || 2000, // $20.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/checkout/cancel`,
    };

    // Add customer email if provided
    if (priceData?.customerEmail) {
      sessionParams.customer_email = priceData.customerEmail;
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create(sessionParams);

    // Save basic transaction record
    const transactionData = {
      stripeSessionId: session.id,
      productName: priceData?.name || 'Trading Package',
      amount: priceData?.amount || 2999,
      customerEmail: priceData?.customerEmail || 'pending', // Will update when payment completes
      status: 'pending'
    };

    // Add userId if provided (for logged-in users)
    if (priceData?.userId && mongoose.Types.ObjectId.isValid(priceData.userId)) {
      transactionData.userId = priceData.userId;
    }

    const transaction = new Transaction(transactionData);
    await transaction.save();

    res.json({ 
      success: true,
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Verify Payment Session
const verifySession = async (req, res) => {
  try {
    const stripe = connectStripe();
    const { sessionId } = req.params;

    // Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Update transaction in database
    if (session.payment_status === 'paid') {
      const transaction = await Transaction.findOne({ stripeSessionId: sessionId });
      
      if (transaction) {
        const now = new Date();
        const accessDays = transaction.accessPeriodDays || 30; // Use stored period or default to 30
        const accessEndDate = new Date(now.getTime() + (accessDays * 24 * 60 * 60 * 1000));
        
        await Transaction.findOneAndUpdate(
          { stripeSessionId: sessionId },
          { 
            status: 'paid',
            customerEmail: session.customer_details?.email || transaction.customerEmail,
            accessStartDate: now,
            accessEndDate: accessEndDate
          }
        );
      }
    } else if (session.payment_status === 'canceled' || session.payment_status === 'expired') {
      // Update failed/canceled payments
      await Transaction.findOneAndUpdate(
        { stripeSessionId: sessionId },
        { 
          status: session.payment_status === 'canceled' ? 'canceled' : 'failed'
        }
      );
    }

    res.json({
      success: true,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email,
      }
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Check if user has active access
const checkUserAccess = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Handle guest users or invalid ObjectIds
    if (!userId || userId === 'guest') {
      return res.json({
        success: true,
        hasAccess: false,
        activePackages: []
      });
    }

    // Build query - prefer userId, fallback to email for backward compatibility
    let query = {};
    if (mongoose.Types.ObjectId.isValid(userId)) {
      // It's a valid ObjectId, search by userId
      query.userId = userId;
    } else {
      // It's likely an email or other identifier, search by email
      query.customerEmail = userId;
    }
    
    // Find user's active transactions
    const activeTransactions = await Transaction.find({
      ...query,
      status: 'paid',
      accessEndDate: { $gt: new Date() } // End date is in the future
    });

    // Check each transaction and update if expired
    const validTransactions = [];
    for (const transaction of activeTransactions) {
      if (transaction.checkAccess()) {
        validTransactions.push(transaction);
      } else {
        await transaction.save(); // Save the updated status
      }
    }

    res.json({
      success: true,
      hasAccess: validTransactions.length > 0,
      activePackages: validTransactions.map(t => ({
        package: t.productName,
        expiresAt: t.accessEndDate,
        daysRemaining: Math.ceil((t.accessEndDate - new Date()) / (1000 * 60 * 60 * 24)),
        totalDays: t.accessPeriodDays || 30, // Include total period for progress calculation
        // Include transaction ID for frontend tracking (but don't expose sensitive data)
        id: t._id
      }))
    });
  } catch (error) {
    console.error('Error checking user access:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  createCheckoutSession,
  verifySession,
  checkUserAccess,
};