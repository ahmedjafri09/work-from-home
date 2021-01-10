const Blog = require("../../models/Blog");

module.exports = async (req, res, next) => {
  try {
    const author = req.user._id;
    const { commentId, blogId } = req.body;

    const testing = await Blog.findOneAndUpdate(
      { _id: blogId },
      { $pull: { comments: { _id: commentId, author } } },
      { new: true }
    );

    return res.json({ testing });
  } catch (error) {
    next(error);
  }
};
