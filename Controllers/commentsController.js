const Comment = require("../Models/commentModel.js");
const asyncHandler = require("express-async-handler");

// create new comment
//method Post http://localhost:5000/comment

const addComment = asyncHandler(async (req, res, next) => {
  const { comment_text } = req.body;
  try {
    if (!req.params.id) {
      // not found userPosts
      return res.status(404).json({
        error: "Post not found!",
      });
    } else {
      if (!comment_text) {
        return res.status(403).json({
          error: "comment is empty",
        });
      }
      await Comment.create({
        user_id: req.params.id, //who make the comment
        post_id: req.params.pId,
        comment_text: comment_text,
      });

      return res.status(200).json({
        message: "comment successfully added",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = {
  addComment,
};

// const { comment_text } = req.body;

//   if (!comment_text) {
//     res.status(400);
//     return res.json({ message: "This field cannot be empty!" });
//   }

//   const comment = await Comment.create({
//     comment_text,
//   });
//   if (comment) {
//     res.status(201).json({
//       comment_text: comment.comment_text,
//       message: "Comment added succesfully",
//     });
//   }
