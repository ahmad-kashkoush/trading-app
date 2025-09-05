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
    const { email, firstName, lastName, password } = req.body;
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !isValidEmail(email)
    ) {
      return res.status(400).json({
        message: "Invalid or missing email, firstName, lastName, or password",
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
      firstName,
      lastName,
      email,
      password,
      verifiedCode: hashCode,
      expireVerifyCode: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
    });
    // 5. Prepare email content
    const message = `Hi ${firstName},\nWe sent your verification code from Trading App. Your code is: ${code}\nPlease enter this code on the website to verify your email.`;
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

// Admin middleware to check if user is admin
const AdminRoute = async (req, res, next) => {
  try {
    // First check if user is authenticated
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

    // Check if user exists and is admin
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin role required" });
    }

    next();
  } catch (error) {
    console.error("Admin route error:", error);
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

// Admin function to create user
const AdminCreateUser = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      phone,
      role = "user",
    } = req.body;

    // Validate input
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !isValidEmail(email)
    ) {
      return res.status(400).json({
        message: "Invalid or missing email, firstName, lastName, or password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    // Create new user (admin can create verified users)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      isVerified: true, // Admin created users are automatically verified
    });

    await newUser.save();

    // Return user data (without password)
    const userResponse = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Admin create user error:", error);
    return res
      .status(500)
      .json({ message: "Server error during user creation" });
  }
};

// Admin function to delete user
const AdminDeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if user exists
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent admin from deleting themselves
    if (userId === req.user._id) {
      return res
        .status(400)
        .json({ message: "Admin cannot delete their own account" });
    }

    // Prevent admin from deleting other admins (optional security measure)
    if (userToDelete.role === "admin") {
      return res
        .status(403)
        .json({ message: "Cannot delete another admin account" });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully",
      deletedUser: {
        _id: userToDelete._id,
        email: userToDelete.email,
        firstName: userToDelete.firstName,
        lastName: userToDelete.lastName,
      },
    });
  } catch (error) {
    console.error("Admin delete user error:", error);
    return res
      .status(500)
      .json({ message: "Server error during user deletion" });
  }
};

// Admin function to get all users
const AdminGetAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      {
        password: 0,
        verifiedCode: 0,
        resetCode: 0,
        resetCodeExpiry: 0,
        expireVerifyCode: 0,
      }
    ).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Users retrieved successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Admin get all users error:", error);
    return res
      .status(500)
      .json({ message: "Server error while retrieving users" });
  }
};

// Admin function to update user
const AdminUpdateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email, phone, role, isVerified } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if user exists
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent admin from updating themselves to non-admin role
    if (userId === req.user._id && role === "user") {
      return res
        .status(400)
        .json({ message: "Admin cannot demote themselves" });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: firstName || userToUpdate.firstName,
        lastName: lastName || userToUpdate.lastName,
        email: email || userToUpdate.email,
        phone: phone !== undefined ? phone : userToUpdate.phone,
        role: role || userToUpdate.role,
        isVerified:
          isVerified !== undefined ? isVerified : userToUpdate.isVerified,
      },
      { new: true, runValidators: true }
    ).select(
      "-password -verifiedCode -resetCode -resetCodeExpiry -expireVerifyCode"
    );

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Admin update user error:", error);
    return res.status(500).json({ message: "Server error during user update" });
  }
};

module.exports = {
  Signup,
  VerifyEmail,
  ProtectedRoute,
  Login,
  ForgetPassword,
  ResetPasswordCode,
  resetPassword,
  AdminRoute,
  AdminCreateUser,
  AdminDeleteUser,
  AdminGetAllUsers,
  AdminUpdateUser,
};
