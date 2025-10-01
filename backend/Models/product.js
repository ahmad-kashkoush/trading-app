const mongoose = require("mongoose");
const dayjs = require("dayjs");
// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, min: 0 }, // default currency USD
    currency: {type: String, default: "USD"},
    type: { type: String, required: true, enum: ["subscription", "physical"] }
}, { discriminatorKey: "type", timestamps: true });

const Product = mongoose.model("Product", productSchema);

// Subscription Schema
const subscriptionSchema = new mongoose.Schema({
    duration: { type: Number, required: true, min: 1, default: 30 }, // duration in days
    plan: { type: String, enum: ["basic", "premium", "enterprise"], default: "basic" }
});


subscriptionSchema.virtual('endDate').get(function () {
    const now = dayjs();
    return this.startDate ?
        dayjs(this.startDate).add(this.duration, 'day').toDate()
        : null;
});
subscriptionSchema.virtual('isActive').get(function () {
    if (!this.startDate) return false;
    const now = dayjs();
    return now.isAfter(dayjs(this.startDate)) && now.isBefore(dayjs(this.endDate));
});

subscriptionSchema.set('toJSON', { virtuals: true });
subscriptionSchema.set('toObject', { virtuals: true });


const Subscription = Product.discriminator("subscription", subscriptionSchema);
module.exports = { Product, Subscription };