const Blog = require("../../models/Blog");

module.exports = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("author comments.author");

    return res.json({ blogs });
  } catch (error) {
    next(error);
  }
};
