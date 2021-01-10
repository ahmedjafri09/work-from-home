const Blog = require("../../models/Blog");

module.exports = async (req, res, next) => {
  try {
    const author = req.user._id;
    const { title } = req.body;

    const deleteBlog = await Blog.deleteOne({ title, author });

    return res.json({ deleteBlog });
  } catch (error) {
    next(error);
  }
};
