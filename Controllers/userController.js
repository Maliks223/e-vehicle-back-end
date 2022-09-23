const jwt = import("jsonwebtoken");
const bcrypt = import("bcryptjs");
const asyncHandler = import("express-async-handler");
const User = import("../models/userModel");
const { request } = import("express");


//Register New User
// Route POST /user/
//Access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      res.json({ message: "All fields are required!" })
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
      name,
      email,
      password: hashedPassword,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token:generateToken(user._id),
      });
    } else {
      res.status(400);
      res.json({ message: "Invalid user data!" });
    }
  });
  
  //Register Authebticate a user
  // Route POST /user/login
  //Access PRIVATE
  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Check for the user email
    const user = await User.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        admin: user.isAdmin,
        token:generateToken(user._id),
      });
    } else {
      res.status(400);
      res.json({ message: "Invalid credentials!" });
    }
  });
  
  //Get user data
  // Route GET /users/me
  //Access PRIVATE
  const getMe = asyncHandler(async(req, res) => {
    
    const  { _id, name, email } =  await User.findById(req.user.id)
      res.status(200).json({
        id:_id,
        name,
        email,
      })
    
  });
  
  //Generate JWT
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  };
  
  export  {
    registerUser,
    loginUser,
    getMe,
  };