const express = require("express");
const router = express.Router();
const createBlog = require("../actions/blog/createBlog");
const deleteBlog = require("../actions/blog/deleteBlog");
const updateBlog = require("../actions/blog/updateBlog");
const authenticateToken = require("../middlewares/authenticateToken");
const createComment = require("../actions/comment/createComment");
const deleteComment = require("../actions/comment/deleteComment");
const getBlog = require("../actions/blog/getBlog");
const getBlogs = require("../actions/blog/getBlogs");

//creating a new blog
router.route("/").post(authenticateToken, createBlog).get(getBlogs);

router
  .route("/:blog_id")
  .get(getBlog)
  .put(authenticateToken, updateBlog)
  .delete(authenticateToken, deleteBlog);

router.route("/:blog_id/comments").post(authenticateToken, createComment);

router
  .route("/:blog_id/comments/:comment_id")
  .delete(authenticateToken, deleteComment);
module.exports = router;
