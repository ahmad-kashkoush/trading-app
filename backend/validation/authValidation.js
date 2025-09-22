const { check } = require("express-validator");
const ValidationMiddleware = require("../middleware/validationMiddleware");
const User = require("../Models/user");

// Signup Validation
exports.SignUpValidation = [
  check("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2 })
    .withMessage("The minimum characters for full name is 2")
    .isLength({ max: 32 })
    .withMessage("The maximum characters for full name is 32"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject(new Error("The email address is already used"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Please enter your password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("The password and passwordConfirm fields do not match");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Please enter your passwordConfirm"),
  ValidationMiddleware,
];

// Login Validation
exports.LoginValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("Please enter your password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  ValidationMiddleware,
];

// Verify Email Validation
exports.VerifyEmailValidation = [
  check("code")
    .notEmpty()
    .withMessage("Verification code is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Verification code must be 6 digits"),
  ValidationMiddleware,
];

// Resend Code Validation (no body fields required)
exports.ResendCodeValidation = [ValidationMiddleware];

// Forget Password Validation
exports.ForgetPasswordValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  ValidationMiddleware,
];

// Reset Password Code Validation
exports.ResetPasswordCodeValidation = [
  check("code")
    .notEmpty()
    .withMessage("Code is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Code must be 6 digits"),
  ValidationMiddleware,
];

// Reset Password Validation
exports.ResetPasswordValidation = [
  check("password")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Please enter your passwordConfirm")
    .custom((password, { req }) => {
      if (password !== req.body.password) {
        throw new Error("The password and passwordConfirm fields do not match");
      }
      return true;
    }),
  ValidationMiddleware,
];
