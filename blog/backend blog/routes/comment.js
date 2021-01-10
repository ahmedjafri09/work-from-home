const express = require("express");
const createComment = require("../actions/comment/createComment");
const deleteComment = require("../actions/comment/deleteComment");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

//new comment
router.post("/new-comment", authenticateToken, createComment);
//delete comment
router.post("/delete-comment", authenticateToken, deleteComment);

module.exports = router;
