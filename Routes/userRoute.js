const express = require( 'express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../Controllers/userController.js");
const protect = require("../Middlewares/authMiddlewares")

router.post("/", registerUser);
router.post("/login", loginUser);
router.route("/me").get(protect, getMe);

module.exports = router;