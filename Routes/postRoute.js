const express = require( 'express');
const router = express.Router();
const { createPost } = require("../Controllers/postController.js");
const protect = require("../Middlewares/authMiddlewares");
const upload = require('../Middlewares/upload.js');

router.post("/", upload.single("img"), createPost);

module.exports = router;