const express = require( 'express');
const router = express.Router();
const { createPost, deletePost, getAllPosts, getSinglePost } = require("../Controllers/postController.js");
const protect = require("../Middlewares/authMiddlewares");
const upload = require('../Middlewares/upload.js');

router.post("/", protect, upload.single("img"), createPost);
router.get("/all",  getAllPosts);
router.get("/:id", protect, getSinglePost);
router.delete("/delete", protect, deletePost);

module.exports = router;