const express = require("express");
const { 
  createCheckoutSession, 
  verifySession,
  checkUserAccess
} = require("../controller/payment.controller");

const router = express.Router();

// Create checkout session
router.post("/create-checkout-session", createCheckoutSession);

// Verify payment session
router.get("/verify-session/:sessionId", verifySession);

// Check if user has active access
router.get("/check-access/:userId", checkUserAccess);

module.exports = router;
