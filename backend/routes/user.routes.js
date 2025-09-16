const express = require("express");
const {
  Signup,
  VerifyEmail,
  ResendVerificationCode,
  Login,
  ForgetPassword,
  ResetPasswordCode,
  resetPassword,
  ProtectedRoute,
//   getAllUsers,
} = require("../controller/user.controller");

const router = express.Router();

router.post("/signup", Signup);
router.put("/verify-email", ProtectedRoute, VerifyEmail);
router.post("/resend-verification", ProtectedRoute, ResendVerificationCode);
router.post("/login", Login);
router.post("/forgot-password", ForgetPassword);
router.post("/reset-password-code", ProtectedRoute, ResetPasswordCode);
router.put("/reset-password", ProtectedRoute, resetPassword);
// router.get("/", ProtectedRoute, getAllUsers);

module.exports = router;
