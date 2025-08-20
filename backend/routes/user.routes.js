const express = require("express");
const { Signup } = require("../controller/user.controller");

const router = express.Router();

router.post("/signup", Signup);

module.exports = router;