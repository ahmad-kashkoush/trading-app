const Stripe = require("stripe");

let stripe;

const connectStripe = () => {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-01-27.acacia", // use the latest
    });
    console.log("Stripe connected");
  }
  return stripe;
};

module.exports = connectStripe;
