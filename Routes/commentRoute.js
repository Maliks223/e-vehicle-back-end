const express = require( 'express');
const router = express.Router();
const protect = require("../Middlewares/authMiddlewares");
const { addComment } = require('../Controllers/commentsController')

router.post('/', addComment)

module.exports = router;