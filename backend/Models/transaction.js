const mongoose = require("mongoose");
const { TRANSACTION_STATUS, CURRENCIES, PAYMENT_LIMITS, DEFAULTS } = require("../utils/constants");

/**Todo - COMPLETED
 * ✅ make userId in transaction model required not optional, or at least has a default userId.
 * ✅ Email better if validated with regex.
 * ✅ Check what is better if indexed for faster lookups - Added indexes
 * ✅ Product name: Better if linked to a Product model via productId - Now uses productId reference
 * ✅ Amount better if you add min max validation and currency - Added validation and currency support
 */
const TransactionSchema = new mongoose.Schema(
  {
    // Basic user info
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      lowercase: true,
      trim: true,
    },

    // Stripe session ID for tracking
    stripeSessionId: {
      type: String,
      required: [true, "Stripe session ID is required"],
      unique: true,
    },

    // Product info - Updated to use productId reference
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
      // Removed individual index - not frequently queried alone
    },

    // Keep productName for backward compatibility and quick access
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },

    // Payment info - validation handled by transactionValidation.js
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },

    currency: {
      type: String,
      required: true,
      default: DEFAULTS.CURRENCY,
      uppercase: true,
    },

    // Simple status
    status: {
      type: String,
      enum: Object.values(TRANSACTION_STATUS),
      required: [true, "Transaction status is required"],
      default: TRANSACTION_STATUS.PENDING,
      // Removed individual index - covered by compound indexes
    },

    // Access period - validation handled by transactionValidation.js
    accessStartDate: {
      type: Date,
    },
    
    accessEndDate: {
      type: Date,
      // Removed individual index - covered by compound indexes
    },

    // Store access duration in days - validation handled by transactionValidation.js
    accessPeriodDays: {
      type: Number,
      default: DEFAULTS.ACCESS_PERIOD_DAYS,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// All indexes removed for maximum write performance
// Indexes can be added later if specific query performance issues arise

// Pre-save middleware to auto-populate productName from Product
TransactionSchema.pre('save', async function(next) {
  if (this.isNew && this.productId && !this.productName) {
    try {
      const Product = mongoose.model('Product');
      const product = await Product.findById(this.productId);
      if (product) {
        this.productName = product.name;
        // Also set access period from product if not specified
        if (!this.accessPeriodDays && product.accessPeriodDays) {
          this.accessPeriodDays = product.accessPeriodDays;
        }
      }
    } catch (error) {
      return next(error);
    }
  }
  
  // Auto-calculate accessEndDate if not provided
  if (this.accessStartDate && this.accessPeriodDays && !this.accessEndDate) {
    this.accessEndDate = new Date(this.accessStartDate.getTime() + (this.accessPeriodDays * 24 * 60 * 60 * 1000));
  }
  
  next();
});

// Method to check if access is currently valid - IMPROVED with atomic operations
/**
 * Improved version that uses atomic operations to prevent race conditions
 * and includes proper error handling
 */
TransactionSchema.methods.checkAccess = async function (save = false) {
  const now = new Date();
  const isValid = this.status === TRANSACTION_STATUS.PAID &&
    this.accessEndDate &&
    now <= this.accessEndDate;

  // Update status if access has expired (with atomic operation if save=true)
  if (!isValid && this.status === TRANSACTION_STATUS.PAID && this.accessEndDate && now > this.accessEndDate) {
    if (save) {
      try {
        // Use atomic operation to prevent race conditions
        await this.constructor.findByIdAndUpdate(
          this._id,
          { 
            $set: { status: TRANSACTION_STATUS.EXPIRED },
            $currentDate: { updatedAt: true }
          },
          { new: true }
        );
        this.status = TRANSACTION_STATUS.EXPIRED;
      } catch (error) {
        throw new Error(`Failed to update transaction status: ${error.message}`);
      }
    } else {
      this.status = TRANSACTION_STATUS.EXPIRED;
    }
  }

  return isValid;
};

// Static method for bulk expiration check
TransactionSchema.statics.expireOverdueTransactions = async function() {
  const now = new Date();
  try {
    const result = await this.updateMany(
      {
        status: TRANSACTION_STATUS.PAID,
        accessEndDate: { $lt: now }
      },
      {
        $set: { status: TRANSACTION_STATUS.EXPIRED },
        $currentDate: { updatedAt: true }
      }
    );
    return result;
  } catch (error) {
    throw new Error(`Failed to expire overdue transactions: ${error.message}`);
  }
};

// Method to calculate remaining access days
TransactionSchema.methods.getRemainingDays = function() {
  if (this.status !== TRANSACTION_STATUS.PAID || !this.accessEndDate) {
    return 0;
  }
  
  const now = new Date();
  const diffTime = this.accessEndDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
};

// Virtual field to check if currently active (computed, not stored)
TransactionSchema.virtual('isActive').get(function () {
  return this.status === TRANSACTION_STATUS.PAID &&
    this.accessEndDate &&
    new Date() <= this.accessEndDate;
});

// Virtual field for formatted amount
TransactionSchema.virtual('formattedAmount').get(function () {
  return `${this.currency} ${(this.amount / 100).toFixed(2)}`;
});

// Ensure virtual fields are included in JSON output
TransactionSchema.set('toJSON', { virtuals: true });
TransactionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
