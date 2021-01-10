const Blog = require("../../models/Blog");

module.exports = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const author = req.user._id;

    const updated = await Blog.updateOne(
      { title, author },
      { $set: { body: text } }
    );

    if (!updated.n) {
      next({
        status: 404,
        message: "Blog not found",
      });
    }

    return res.json({ updated });
  } catch (error) {
    next(error);
  }
};
