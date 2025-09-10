const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "The full name is required"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
    },
    phone: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    verifiedCode: {
      type: String, // Store hashed verification code
    },
    expireVerifyCode: {
      type: Date, // Store expiry time for verification code
    },
  },
  { timestamps: true }
);

// Add index for email to improve query performance
// UserSchema.index({ email: 1 });

const User = mongoose.model("User", UserSchema);
module.exports = User;