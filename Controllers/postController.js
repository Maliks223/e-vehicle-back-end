const Post = require("../Models/postModel.js");
const asyncHandler = require("express-async-handler");

//   Create new post
// method post / http://localhost:5000/post

const createPost = asyncHandler(async (req, res) => {
  // console.log("create post");
  console.log('here');
  const { title, desc, categories, author } = req.body;
  const img = req?.file;
  console.log("img", img);

  if (!title && !desc && !categories && !img && !author) {
    res.status(400);
    return res.json({ message: "All fields are required!" });
  }
  let errors = {};
  //check title only
  if (!title) {
    errors["title"] = "Title is required";
  }
  //check desc only
  if (!desc) {
    errors["description"] = "Description is required";
  }

  //check category only
  if (!categories) {
    errors["category"] = "Category is required";
  }

  if(categories.length>=10) {
    errors["category"] = "Category can be 15 characters only, post was not created!";
  }

 
  //check image only
  if (!img) {
    errors["image"] = "Image is required";
  }
  if (Object.keys(errors).length !== 0) {
    res.status(400);
    return res.json({ errors: errors });
  }

  const post = await Post.create({
    title,
    author,
    desc,
    categories,
    img: img.filename,
  });
  if (post) {
    res.status(201).json({
      id: post.id,
      title: post.title,
      author: post.author,
      desc: post.desc,
      categories: post.categories,
      img: post.img,
      message: "Post created",
    });
  }
});

// Delete a post

const deletePost = asyncHandler(async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one post

const getSinglePost = asyncHandler(async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    res.status(200).json(Post);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts/
// Get method / http://localhost:5000/post/all

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const Posts = await Post.find()
    res.status(200).json(Posts)
  } catch (err) {
    return res.status(500).json(err);
  }
});

const searchPosts = asyncHandler(async (req, res) => {
  try {
    const Posts = await Post.find({
      title: {
        $regex: req.query.q,
        $option: "i",
      },
      title: {
        $regex: req.query.q,
        $option: "i",
      }
    })
    res.status(200).json(Posts)
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = {
  createPost,
  deletePost,
  getSinglePost,
  getAllPosts,
};
