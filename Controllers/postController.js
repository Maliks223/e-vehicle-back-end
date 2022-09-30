const Post = require("../Models/postModel.js");
const asyncHandler = require("express-async-handler");

// const Post = (post) => ({
//   title: req.body.title,
//   desc: req.body.desc,
//   img: req.file && req.file.path,
//   categories: req.body.categories,
//   isApproved: req.body.isApproved,
// });

//   Get all posts
const createPost = asyncHandler(async (req, res) => {
  const { title, desc, categories } = req.body;
  const img = req.file.path
  console.log(img);

  if (!title && !desc && !categories && !img) {
    res.status(400);
    return res.json({ message: "All fields are required!" });
  }
  let errors = {}; 
    //check title only 
  if (!title){
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
    //check image only
  if (!img) {
    errors["image"] = "Image is required";
  }
  if(Object.keys(errors).length !== 0){
    res.status(400);
    return res.json({ errors: errors });
  }
  
  const post = await Post.create({
    title,
    desc,
    categories,
    img,
  });
  if (post){
    res.status(201).json({
      title: post.title,
      desc: post.desc,
      categories: post.categories,
      img:post.img,
      message:"Post created"
    })
  }

});

module.exports = {
    createPost,

}
