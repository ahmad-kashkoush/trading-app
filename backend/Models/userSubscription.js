const mongoose = require('mongoose');
const dayjs = require('dayjs');
const { Product } = require('./product');

const userSubscriptionSchema = new mongoose.Schema({
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    billingCycle: {
        type: String,
        enum: ["one-time", "monthly", "yearly"],
        default: "one-time"
    },
    autoRenew: {
        type: Boolean,
        default: false
    },
    nextRenewalDate: Date,
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    }
}, { timestamps: true });

// Instance method to calculate subscription end date
userSubscriptionSchema.methods.getEndDate = async function () {
    // 1. find productId in product Collection
    // 2. Get duration from there.
    // 3. Calculate endDate based on startDate + duration

    if (!this.startDate) {
        return null;
    }

    const product = await Product.findById(this.productId);

    if (!product || product.type !== 'subscription' || !product.duration) {
        return null;
    }

    return dayjs(this.startDate).add(product.duration, 'day').toDate();
};

// Instance method to check if subscription is currently active
userSubscriptionSchema.methods.isActive = async function () {
    // 1. find productId in product Collection
    // 2. Get duration from there.
    // 3. Determine if current date is between startDate and endDate

    if (!this.startDate || this.status !== 'active') {
        return false;
    }

    const endDate = await this.getEndDate();
    if (!endDate) {
        return false;
    }

    const now = dayjs();
    return now.isAfter(dayjs(this.startDate)) && now.isBefore(dayjs(endDate));
};

const UserSubscription= mongoose.model('UserSubscription', userSubscriptionSchema);
module.exports = UserSubscription;