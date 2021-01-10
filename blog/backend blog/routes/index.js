const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const blogRouter = require("./blog");
const commentRouter = require("./comment");

/* GET home page. */

//auth route
router.use("/auth", authRouter);
//blog route
router.use("/blogs", blogRouter);
//comments route
router.use("/comment", commentRouter);

module.exports = router;
