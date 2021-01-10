const Blog = require("../../models/Blog");

module.exports = async (req, res, next) => {
  try {
    const user = req.user;
    const data = {
      title: req.body.title,
      body: req.body.text,
      author: user._id,
    };

    const blog = await Blog.create(data);

    if (!blog) {
      next({
        status: 418, //TPOT
        message: "Blog not created",
      });
    }
    const testing = await Blog.findOne({ title: req.body.title }).populate(
      "author"
    );
    console.log(testing);

    return res.json({ blog });
  } catch (error) {
    next(error);
  }
};
