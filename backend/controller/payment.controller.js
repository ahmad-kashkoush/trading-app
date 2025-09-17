const connectStripe = require("../utils/stripe");

// Create Checkout Session
const createCheckoutSession = async (req, res) => {
  try {
    const stripe = connectStripe();
    const { priceData, successUrl, cancelUrl } = req.body;

    // Default values for testing
    const session = await stripe.checkout.sessions.create({
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
      success_url: successUrl || `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/cancel`,
    });

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

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
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

module.exports = {
  createCheckoutSession,
  verifySession,
};