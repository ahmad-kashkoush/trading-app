const express= require("express");
const { getCurrentUser } = require("../middleware/authMiddleware");
const { getSubscriptions } = require("../controller/subscription.controller");



const router = express.Router();

// get all subscriptions and indicate owned by current user.
router.get("/", getCurrentUser, getSubscriptions);


module.exports = router;
