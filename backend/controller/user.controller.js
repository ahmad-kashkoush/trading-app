const User = require("../Models/user");
const asyncHandler = require("express-async-handler");
const { sendEmailCode } = require("../utils/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/globalError");

// Utility: Generate JWT Token
const generateToken = (payload) =>
  jwt.sign({ _id: payload }, process.env.JWT_SECRET, { expiresIn: "1h" });

// Utility: Validate Email Format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Signup Controller
const Signup = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return next(new AppError("User already exists", 400));

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashCode = crypto.createHash("sha256").update(code).digest("hex");

  const newUser = new User({
    fullName,
    email,
    password,
    verifiedCode: hashCode,
    expireVerifyCode: Date.now() + 10 * 60 * 1000, // 10 min
  });

  const message = `Hi ${fullName},\nWe sent your verification code from Trading App. Your code is: ${code}\nPlease enter this code on the website to verify your email.`;

  try {
    await sendEmailCode({
      email,
      subject: "Email Verification Code",
      message,
    });
  } catch (error) {
    return next(new AppError("Failed to send verification email", 500));
  }

  await newUser.save();
  const token = generateToken(newUser._id);

  return res
    .status(200)
    .json({ message: "Verification code sent to your email", token });
});

// Verify Email Controller
const VerifyEmail = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  const existingUser = await User.findById(req.user._id);
  if (!existingUser) return next(new AppError("User not found", 404));

  const hashCode = crypto.createHash("sha256").update(code).digest("hex");
  if (
    existingUser.verifiedCode !== hashCode ||
    existingUser.expireVerifyCode < Date.now()
  ) {
    return next(new AppError("Invalid or expired code", 400));
  }

  existingUser.isVerified = true;
  existingUser.verifiedCode = undefined;
  existingUser.expireVerifyCode = undefined;
  await existingUser.save();

  const token = generateToken(existingUser._id);

  return res.status(200).json({
    message: "Email verified successfully",
    token,
    existingUser,
  });
});

// Resend Verification Code Controller
const ResendVerificationCode = asyncHandler(async (req, res, next) => {
  const existingUser = await User.findById(req.user._id);
  if (!existingUser) return next(new AppError("User not found", 404));
  if (existingUser.isVerified)
    return next(new AppError("Email is already verified", 400));

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashCode = crypto.createHash("sha256").update(code).digest("hex");

  existingUser.verifiedCode = hashCode;
  existingUser.expireVerifyCode = Date.now() + 10 * 60 * 1000;

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

  try {
    await sendEmailCode({
      email: existingUser.email,
      subject: "New Email Verification Code",
      message,
    });
  } catch (error) {
    return next(
      new AppError("Failed to send verification email: " + error.message, 500)
    );
  }

  await existingUser.save();

  return res.status(200).json({
    message: "New verification code sent to your email",
  });
});

// Login Controller
const Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Email and password are required", 400));

  const user = await User.findOne({ email, password });
  if (!user) return next(new AppError("Email or password is incorrect", 404));

  res.status(200).json({
    message: "Login successful",
    token: generateToken(user._id),
    user,
  });
});

// Forget Password Controller
const ForgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email || !isValidEmail(email))
    return next(new AppError("Invalid email address", 400));

  const user = await User.findOne({ email });
  if (!user) return next(new AppError("User not found", 404));

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashCode = crypto.createHash("sha256").update(code).digest("hex");

  user.resetCode = hashCode;
  user.resetCodeExpiry = Date.now() + 10 * 60 * 1000;
  const message = `Hi ${email},\nWe sent your verification code from Trading App. Your code is: ${code}\nPlease enter this code on the website to verify your email.`;

  await user.save();
  try {
    await sendEmailCode({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    return res.status(200).json({
      message: "Reset code sent to email successfully",
      token: generateToken(user._id),
    });
  } catch (error) {
    return next(new AppError("Failed to send reset email", 500));
  }
});



// Reset Password Code Controller
const ResetPasswordCode = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  if (!code) return next(new AppError("Code is required", 400));

  const existingUser = await User.findById(req.user._id);
  if (!existingUser) return next(new AppError("User not found", 404));

  const hashCode = crypto.createHash("sha256").update(code).digest("hex");
  if (
    existingUser.resetCode !== hashCode ||
    existingUser.resetCodeExpiry < Date.now()
  ) {
    return next(new AppError("Invalid or expired code", 400));
  }

  existingUser.resetCode = undefined;
  existingUser.resetCodeExpiry = undefined;
  await existingUser.save();

  return res.status(200).json({ message: "Code submitted successfully" });
});

// Reset Password Controller
const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  if (!password) return next(new AppError("New password is required", 400));

  const existingUser = await User.findById(req.user._id);
  if (!existingUser) return next(new AppError("User not found", 404));

  existingUser.password = password; // Should be hashed in production
  await existingUser.save();

  return res.status(200).json({
    message: "Password reset successfully",
    token: generateToken(existingUser._id),
  });
});

// Get All Users Controller
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Protected Route Middleware
const ProtectedRoute = asyncHandler(async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Unauthorized, token missing", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

module.exports = {
  Signup,
  VerifyEmail,
  ResendVerificationCode,
  ProtectedRoute,
  Login,
  ForgetPassword,
  ResetPasswordCode,
  resetPassword,
  getAllUsers,
};
