const express = require("express");
const {
  Signup,
  VerifyEmail,
  Login,
  ProtectedRoute,
  ForgetPassword,
  ResetPasswordCode,
  resetPassword,
} = require("../controller/user.controller");

const router = express.Router();

router.post("/signup", Signup);
router.put("/verify-email", ProtectedRoute, VerifyEmail);
router.post("/login", Login);
router.post("/forgot-password", ForgetPassword);
router.post("/reset-password-code", ProtectedRoute, ResetPasswordCode);
router.put("/reset-password", ProtectedRoute, resetPassword);

module.exports = router;
