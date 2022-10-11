const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const { request } = require("express");

//Register New User
// Route POST /user/
//Access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName && !email && !password) {
    res.status(400);
   return res.json({ message: "All fields are required!" });
  }
  let errors = {};
  //check username only
  if (!userName) {
    errors["userName"] = "User name is required";
  }
  //check password only
  if (!password) {
    errors["password"] = "Password is required";
  }
  //check email only
  if (!email) {
    errors["email"] = "Email is required";
  }
  if (Object.keys(errors).length !== 0) {
    res.status(400);
    return res.json({ errors: errors });
  }

  // check if user EXISTS
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    res.json({ message: "User already exists!" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user

  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.json({ message: "Invalid user data!" });
  }
});

//Login user
// Route POST /user/login
//Access PRIVATE

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let errors = {};
  
  //check password only 
  if (!password) {
    errors["password"] = "Password is required";
  }
  //check email only
  if (!email) {
    errors["email"] = "Email is required";
  }
  if (Object.keys(errors).length !== 0) {
    res.status(400);
    return res.json({ errors: errors });
  }
  
  // Check for the user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      admin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    return res.json({ message: "Invalid credentials!" });
  }
});

//Get user data
// Route GET /users/me
//Access PRIVATE

const getMe = asyncHandler(async (req, res) => {
  const { _id, userName, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    userName,
    email,
  });
});

//Generate JWT
// console.log(process.env.JWT_SECRET);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
