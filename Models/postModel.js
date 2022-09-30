const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
    {
      title: { type: String, required: true, unique: true },
      desc: { type: String, required: true },
      img: { type: String, required: true },
      categories: Array ,
      isApproved: Boolean,
      
    },{timestamps: true}
  );
  
  const Post = model("Post", PostSchema);

  module.exports = Post;