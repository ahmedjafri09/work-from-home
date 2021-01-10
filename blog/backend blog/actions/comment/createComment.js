const Blog = require("../../models/Blog");

module.exports = async (req, res, next) => {
  try {
    const { blog_id } = req.params;
    const author = req.user._id;
    const { comment } = req.body;

    if (!comment || !blog_id) {
      next({
        status: 418,
        message: "No comment body",
      });
    }

    const newComment = {
      author,
      comment,
    };

    const blog = await Blog.updateOne(
      { _id: blog_id },
      { $push: { comments: newComment } }
    );

    return res.json({ blog });
  } catch (error) {
    next(error);
  }
};
