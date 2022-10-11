const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    comment_text: {
      type: String,
      required: [true, "This field is required"],
    },
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    isApproved: Boolean,
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
