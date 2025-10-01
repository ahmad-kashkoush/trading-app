const asyncHandler = require("express-async-handler");
const { Subscription } = require("../Models/product");
const UserSubscription = require("../Models/userSubscription");



const getSubscriptions = asyncHandler(async (req, res) => {
    const currentUserId = req.currentUserId; // Extracted from auth middleware
    // get all subscriptions from db
    const subscriptions = await Subscription.find({});
    // indicate which are owned by current user.
    if (currentUserId === null) {
        res.json({ subscriptions });
    }
    const subscriptionWithOwnership = await UserSubscription.find({ userId: currentUserId });
    const updateSubscriptions = subscriptions.map(sub => {
        let updateSub = sub;
        if (updateSub._id.toString() === subscriptionWithOwnership[0].productId?.toString()) {
            updateSub = {
                ...updateSub._doc,
                ...subscriptionWithOwnership[0]._doc,
                ownedByCurrentUser: true
            }
        }
        return updateSub;
    })
    // return 
    res.json({
        subscriptions: updateSubscriptions,
    })
});

const getCurrentUserSubscriptions = asyncHandler(async (req, res) => {


});

module.exports = { getSubscriptions };
