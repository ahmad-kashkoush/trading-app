const mongoose = require("mongoose");

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
    amount: {
      type: Number,
      required: true, // Amount in cents
    },
    
    // Simple status
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "canceled", "expired"],
      required: true,
      default: "pending",
    },
    
    // Access period (one-time payment for configurable duration)
    accessStartDate: {
      type: Date,
    },
    accessEndDate: {
      type: Date,
    },
    
    // Store access duration in days for flexibility
    accessPeriodDays: {
      type: Number,
      default: 30 // Default to 30 days, but can be customized per product
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Method to check if access is currently valid
TransactionSchema.methods.checkAccess = function() {
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
TransactionSchema.virtual('isActive').get(function() {
  return this.checkAccess();
});

module.exports = mongoose.model("Transaction", TransactionSchema);
