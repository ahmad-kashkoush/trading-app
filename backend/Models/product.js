const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"]
    },
    
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"]
    },
    
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP']
    },
    
    accessPeriodDays: {
      type: Number,
      required: [true, "Access period is required"],
      min: [1, "Access period must be at least 1 day"],
      max: [365, "Access period cannot exceed 365 days"]
    },
    
    isActive: {
      type: Boolean,
      default: true
    },
    
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ['subscription', 'course', 'premium', 'pro']
    }
  },
  {
    timestamps: true
  }
);

// Index for faster lookups
ProductSchema.index({ name: 1, isActive: 1 });
ProductSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model("Product", ProductSchema);
