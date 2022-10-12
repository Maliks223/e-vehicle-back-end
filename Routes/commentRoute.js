const express = require( 'express');
const router = express.Router();
const protect = require("../Middlewares/authMiddlewares");
const { addComment, addVote } = require('../Controllers/commentsController')

router.post('/:post_id', protect, addComment)
router.put('/:id', protect, addVote)


module.exports = router;