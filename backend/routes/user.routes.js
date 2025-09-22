const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");
const authValidation = require("../validation/authValidation");

// Auth routes config for better reusability and clarity
const routes = [
  {
    method: "post",
    path: "/signup",
    middlewares: [authValidation.SignUpValidation],
    handler: userController.Signup,
  },
  {
    method: "put",
    path: "/verify-email",
    middlewares: [
      userController.ProtectedRoute,
      authValidation.VerifyEmailValidation,
    ],
    handler: userController.VerifyEmail,
  },
  {
    method: "post",
    path: "/resend-verification",
    middlewares: [
      userController.ProtectedRoute,
      authValidation.ResendCodeValidation,
    ],
    handler: userController.ResendVerificationCode,
  },
  {
    method: "post",
    path: "/login",
    middlewares: [authValidation.LoginValidation],
    handler: userController.Login,
  },
  {
    method: "post",
    path: "/forgot-password",
    middlewares: [authValidation.ForgetPasswordValidation],
    handler: userController.ForgetPassword,
  },
  {
    method: "post",
    path: "/reset-password-code",
    middlewares: [
      userController.ProtectedRoute,
      authValidation.ResetPasswordCodeValidation,
    ],
    handler: userController.ResetPasswordCode,
  },
  {
    method: "put",
    path: "/reset-password",
    middlewares: [
      userController.ProtectedRoute,
      authValidation.ResetPasswordValidation,
    ],
    handler: userController.resetPassword,
  },
  // Example for future: get all users
  // {
  //   method: "get",
  //   path: "/",
  //   middlewares: [userController.ProtectedRoute],
  //   handler: userController.getAllUsers,
  // },
];

// Register all routes dynamically
routes.forEach(({ method, path, middlewares, handler }) => {
  router[method](path, ...middlewares, handler);
});

module.exports = router;
