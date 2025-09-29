const express = require("express");
const {
    checkout,
    verify,
} = require("../controller/payment.controller");
const { getCurrentUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Create checkout session (requires user to be logged in)
router.post("/checkout", getCurrentUser, checkout);

// Verify payment session: returns session details and either success or failure.
router.get("/verify-session/:sessionId", getCurrentUser, verify);

module.exports = router;
