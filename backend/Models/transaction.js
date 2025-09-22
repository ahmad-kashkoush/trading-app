const mongoose = require("mongoose");
/**Todo
 * make userId in transaction model required not optional, or at least has a default userId.
 * Email better if validated with regex.
 * Check what is better if indexed for faster looups
 * Product name: Better if linked to a Product model via productId
 * Amount better if you add min max validation and currency.
 */
const TransactionSchema = new mongoose.Schema(
  {
    // Basic user info
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Guest users allowed
    },

    customerEmail: {
      type: String,
      required: true,
    },

    // Stripe session ID for tracking
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },

    // Product info
    productName: {
      type: String,
      required: true,
    },

    // Payment info
    amount: { // todo: 
      type: Number,
      required: true, // Amount in cents
    },

    // Simple status
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "canceled", "expired"], // todo: better in a separate constants file
      required: true,
      default: "pending",
    },

    // Access period (one-time payment for configurable duration)
    accessStartDate: {
      type: Date,
    },
    accessEndDate: { // todo: No validation ensuring accessEndDate is after accessStartDate
      type: Date,
    },

    // Store access duration in days for flexibility
    accessPeriodDays: {
      type: Number,
      default: 30 // todo: Default value of 30 should be configurable via environment variables rather than hardcoded
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Method to check if access is currently valid
/**todo:
 * Modifies the document state but doesn't save to database, creating potential inconsistency
 * No error handling if database operations fail during status updates
 * Should use atomic operations to prevent race conditions when multiple requests check the same transaction
 */
TransactionSchema.methods.checkAccess = function () {
  const now = new Date();
  const isValid = this.status === 'paid' &&
    this.accessEndDate &&
    now <= this.accessEndDate;

  // Update status if access has expired
  if (!isValid && this.status === 'paid' && this.accessEndDate && now > this.accessEndDate) {
    this.status = 'expired';
  }

  return isValid;
};

// Virtual field to check if currently active (computed, not stored)
TransactionSchema.virtual('isActive').get(function () {
  return this.checkAccess();
});

module.exports = mongoose.model("Transaction", TransactionSchema);
