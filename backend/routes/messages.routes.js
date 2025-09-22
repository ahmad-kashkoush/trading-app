const express = require("express");
const { ProtectedRoute } = require("../controller/user.controller");
const { getMessages, sendMessage, getUsers } = require("../controller/messages.controller");
const router = express.Router();

router.get("/;id", ProtectedRoute, getMessages);
router.post("/:id", ProtectedRoute, sendMessage);
router.get("/users", ProtectedRoute, getUsers);

module.exports = router;
