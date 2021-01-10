const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//for comments
const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
});

//blog schema
const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
  },
  body: {
    type: String,
    required: [true, "Text is required"],
    minlength: 50,
  },
  picture: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [CommentSchema],
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
