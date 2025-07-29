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

module.exports = { Signup };
