const express = require("express");
const { 
  createCheckoutSession, 
  verifySession 
} = require("../controller/payment.controller");

const router = express.Router();

// Create checkout session
router.post("/create-checkout-session", createCheckoutSession);

// Verify payment session
router.get("/verify-session/:sessionId", verifySession);

module.exports = router;
