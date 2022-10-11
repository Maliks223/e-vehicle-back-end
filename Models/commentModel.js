const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    desc: String, 
    isApproved: Boolean,
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
