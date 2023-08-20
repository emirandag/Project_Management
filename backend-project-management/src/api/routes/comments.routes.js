const express = require('express');

const { createComment, updateComment, deleteComment, getCommentsByTask } = require("../controllers/comments.controller")
const { isAuth, isAuthManager, isAuthAdmin } = require('../../middlewares/auth.middleware');
const CommentRoutes = express.Router();

CommentRoutes.post("/createcomment", [isAuth], createComment)
CommentRoutes.patch("/updatecomment/:id", [isAuth], updateComment)
CommentRoutes.delete("/deletecomment/:id", [isAuth], deleteComment)
CommentRoutes.get("/task/:id", [isAuth], getCommentsByTask)

module.exports = CommentRoutes