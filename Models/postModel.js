const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, min: 10 },
    desc: { type: String, min: 15 },
    img: { type: String },
    // user_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    author: String,
    categories:  Array,
    comments: [{
      text: String,
      votes: Number,
      date: Date
    }]
    // comments: { type: [String], default: [] }
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = Post;
