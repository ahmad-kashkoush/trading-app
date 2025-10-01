const asyncHandler = require("express-async-handler");
const Transactionn = require("../Models/transaction");
const UserSubscription = require("../Models/userSubscription");
const getTransactionsByUserId = asyncHandler(async (req, res) => {
    const userId = req.currentUserId;
    const transactions = await Transactionn.find({ userId })
        .populate({ path: 'productId', as: 'product' });
    const userSubscription = await UserSubscription.findOne({ userId });

    res.json({ transactions, userSubscription });
});


module.exports = { getTransactionsByUserId };