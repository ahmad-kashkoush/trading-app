// transaction record: sessionId, productId, userId, amount, currency, status:pending 
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: String,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        required: true,
        uppercase: true,
        default: 'USD',
        enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded']
    },
    billingCycle: {
        type: String,
        enum: ["one-time", "monthly", "yearly"],
        default: "one-time"
    }
}, {
    timestamps: true
});


const Transactionn = mongoose.model('Transaction', transactionSchema);
module.exports = Transactionn;