const Blog = require("../../models/Blog");

module.exports = async (req, res, next) => {
  console.log("blog");
  try {
    const { blog_id } = req.params;
    console.log(blog_id);
    const blog = await Blog.find({ _id: blog_id }).populate(
      "author comments.author"
    );

    return res.json({ blog });
  } catch (error) {
    next(error);
  }
};
