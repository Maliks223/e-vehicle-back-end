const Post = require("../Models/postModel.js");
const asyncHandler = require("express-async-handler");

// create new comment
//method Post http://localhost:5000/comment

const addComment = asyncHandler(async (req, res, next) => {
  const { comment_text } = req.body;
  const { id } = req.params;
  try {
    if (!id) {
      // not found userPosts
      return res.status(404).json({
        error: "Post not found!",
      });
    } else {
      if (!comment_text) {
        return res.status(403).json({
          error: "Comment is empty",
        });
      }
      const createdComment = {
        text: comment_text,
        votes: 0,
      };

      const post = await Post.findById(id);

      post.comments.push(createdComment);

      const updatedPost = await Post.findByIdAndUpdate(id, post);

      return res.status(200).json(updatedPost);
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

const addVote = asyncHandler(async (req, res) => {
  const { comment_id } = req.body;
  const { id } = req.params;
  if (!comment_id) {
    return res.status(404).json({
      error: "Post not found!",
    });
  } else {
    const createdComment = {
      // user_id: req.params.id, //who make the comment
    //   text: comment_text,   
      votes: 0,
    };
    const post = await Post.findById(id);
    // post.comments.push(createdComment);
    post.comments.map((comment) => {
      if (comment._id == comment_id) {
        comment.votes = comment.votes + 1;
        console.log("🚀 ~ file: commentsController.js ~ line 60 ~ post.comments.map ~ comment", comment)
      }
    });
  }
});

module.exports = {
  addComment,
  addVote,
};
