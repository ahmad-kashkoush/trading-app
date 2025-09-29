const express = require("express");
const { getCurrentUser } = require("../middleware/authMiddleware");
const { getTransactionsByUserId } = require("../controller/transaction.controller");

const router = express.Router();

// Define your transaction routes here
router.get("/", getCurrentUser, getTransactionsByUserId);
module.exports = router;