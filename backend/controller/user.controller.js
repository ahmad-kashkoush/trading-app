const User = require("../Models/user");
const { sendEmailCode } = require("../utils/sendEmail");
const crypto = require("crypto");
var jwt = require("jsonwebtoken");

const generateTOken = (payload) => {
  const token = jwt.sign({ _id: payload }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
// Utility function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Signup = async (req, res) => {
  try {
    // 1. Validate input
    console.log(req.body);
    const { email, fullName, password } = req.body;
    console.log(req.body)
    if (
      !email ||
      !fullName ||
      !password ||
      !isValidEmail(email)
    ) {
      return res.status(400).json({
        message: "Invalid or missing email, f, lastName, or password",
      });
    }
    // 2. Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists, use a different email" });
    }
    // 3. Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashCode = crypto.createHash("sha256").update(code).digest("hex");
    // 4. Create new user with verification code and expiry
    const newUser = new User({
      fullName,
      email,
      password,
      verifiedCode: hashCode,
      expireVerifyCode: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
    });
    // 5. Prepare email content
    const message = `Hi ${fullName},\nWe sent your verification code from Trading App. Your code is: ${code}\nPlease enter this code on the website to verify your email.`;
    // 6. Send verification email
    try {
      await sendEmailCode({
        email,
        subject: "Email Verification Code",
        message,
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }
    // 7. Save user to database after successful email sending
    await newUser.save();
    const token = generateTOken(newUser._id);
    // 8. Send success response
    return res
      .status(200)
      .json({ message: "Verification code sent to your email", token });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error during signup" });
  }
};
const VerifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Verification code is required" });
    }
    // 1. Check if user exists
    const existingUser = await User.findById(req.user._id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // 2. Check if code matches and is not expired
    const hashCode = crypto.createHash("sha256").update(code).digest("hex");
    if (
      existingUser.verifiedCode !== hashCode ||
      existingUser.expireVerifyCode < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }
    // 3. Update user to mark as verified
    existingUser.isVerified = true;
    existingUser.verifiedCode = undefined; // Clear verification code
    existingUser.expireVerifyCode = undefined; // Clear expiry
    await existingUser.save();
    // 4. Generate JWT token
    const token = generateTOken(existingUser._id);
    // 5. Send success response
    return res.status(200).json({
      message: "Email verified successfully",
      token,
      existingUser,
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res
      .status(500)
      .json({ message: "Server error during email verification" });
  }
};
// todo: refactor
const ResendVerificationCode = async (req, res) => {
  try {
    console.log("🔄 ResendVerificationCode called for user:", req.user._id);
    
    // 1. Check if user exists and is authenticated
    const existingUser = await User.findById(req.user._id);
    if (!existingUser) {
      console.log("❌ User not found:", req.user._id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User found:", existingUser.email);

    // 2. Check if user is already verified
    if (existingUser.isVerified) {
      console.log("ℹ️ User is already verified");
      return res.status(400).json({ message: "Email is already verified" });
    }

    // 3. Generate new 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashCode = crypto.createHash("sha256").update(code).digest("hex");

    console.log("🔢 Generated verification code for:", existingUser.email);

    // 4. Update user with new verification code and expiry
    existingUser.verifiedCode = hashCode;
    existingUser.expireVerifyCode = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // 5. Prepare email content with timestamp to avoid deduplication
    const timestamp = new Date().toLocaleString();
    const message = `Hi ${existingUser.fullName},

This is a RESEND of your verification code from Trading App.

Your new verification code is: ${code}

This code will expire in 10 minutes.
Requested at: ${timestamp}

Please enter this code on the website to verify your email.

If you didn't request this code, please ignore this email.

Best regards,
Trading App Team`;

    console.log("📧 About to send email to:", existingUser.email);

    // 6. Send verification email
    try {
      await sendEmailCode({
        email: existingUser.email,
        subject: "New Email Verification Code",
        message,
      });
      console.log("✅ Email sent successfully!");
    } catch (error) {
      console.error("❌ Email sending failed:", error);
      return res
        .status(500)
        .json({ message: "Failed to send verification email: " + error.message });
    }

    // 7. Save updated user to database
    await existingUser.save();
    console.log("💾 User updated in database");

    // 8. Send success response
    return res.status(200).json({ 
      message: "New verification code sent to your email" 
    });
  } catch (error) {
    console.error("❌ Resend verification code error:", error);
    return res.status(500).json({ 
      message: "Server error during resending verification code: " + error.message 
    });
  }
};
const Login = async (req, res) => {
  // Implement login logic here
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({
    password: password,
    email: email,
  });
  if (!user) {
    return res.status(404).json({ message: "Email Or Password is incorrect" });
  }

  res.status(200).json({
    message: "Login successful",
    token: generateTOken(user._id),
    user,
  });
};

const ForgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // 3. Generate 6-digit verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashCode = crypto.createHash("sha256").update(code).digest("hex");

  // Send reset email
  user.resetCode = hashCode;
  user.resetCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
  const message = `Hi ${email},\nWe sent your verification code from Trading App. Your code is: ${code}\nPlease enter this code on the website to verify your email.`;

  await user.save();
  try {
    await sendEmailCode({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    return res.status(200).json({
      message: "Reset code sent to  email successfully",
      token: generateTOken(user._id),
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
    return res.status(500).json({ message: "Failed to send reset email" });
  }
};
const ResetPasswordCode = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res
      .status(400)
      .json({ message: "Code and new password are required" });
  }
  // 1. Check if user exists
  const existingUser = await User.findById(req.user._id);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  // 2. Check if code matches and is not expired
  const hashCode = crypto.createHash("sha256").update(code).digest("hex");
  if (
    existingUser.resetCode !== hashCode ||
    existingUser.resetCodeExpiry < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired code" });
  }
  // 3. Update user
  existingUser.resetCode = undefined; // Clear reset code
  existingUser.resetCodeExpiry = undefined; // Clear expiry
  await existingUser.save();
  // 4. Send success response
  return res.status(200).json({ message: "code submitted successfully" });
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "New password is required" });
  }
  // 1. Check if user exists
  const existingUser = await User.findById(req.user._id);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }
  // 2. Update password
  existingUser.password = password; // Assuming password is already hashed
  await existingUser.save();
  // 3. Send success response
  return res.status(200).json({
    message: "Password reset successfully",
    token: generateTOken(existingUser._id),
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const ProtectedRoute = async (req, res, next) => {
  try {
    let token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Protected route error:", error);
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
module.exports = {
  Signup,
  VerifyEmail,
  ResendVerificationCode,
  ProtectedRoute,
  Login,
  ForgetPassword,
  ResetPasswordCode,
  resetPassword,
  getAllUsers
};
