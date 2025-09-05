const express = require("express");
const {
  AdminRoute,
  AdminCreateUser,
  AdminDeleteUser,
  AdminGetAllUsers,
  AdminUpdateUser,
} = require("../controller/user.controller");

const router = express.Router();

// All admin routes are protected with AdminRoute middleware
// This ensures only authenticated users with admin role can access these endpoints

// Create a new user
router.post("/users", AdminRoute, AdminCreateUser);

// Get all users
router.get("/users", AdminRoute, AdminGetAllUsers);

// Update a specific user
router.put("/users/:userId", AdminRoute, AdminUpdateUser);

// Delete a specific user
router.delete("/users/:userId", AdminRoute, AdminDeleteUser);

module.exports = router;
