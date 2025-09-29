const express = require("express");
const { 
    checkout,
    verify,
} = require("../controller/payment.controller");

const router = express.Router();

// Create checkout session
router.post("/checkout", checkout);

// Verify payment session: returns session details and either success or failure.
router.get("/verify-session/:sessionId", verify);

module.exports = router;
