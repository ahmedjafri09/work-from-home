import React, { useEffect, useState } from "react";
import Axios from "../axios/axios";
import Comments from "./Comments";
import { Redirect } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState();
  const [clicked, setClicked] = useState(false);

  useEffect(async () => {
    const blogs = await Axios.get("/blogs/");
    setBlogs(blogs.data.blogs);
  }, []);

  const gotoBlog = async (blogId) => {
    const openBlog = await Axios.get(`blogs/${blogId}`);
    setBlog(openBlog.data.blog[0]);
    setClicked(true);
  };
  if (!clicked) {
    return (
      <div>
        <h1>Blog</h1>
        {blogs.map((blog, i) => (
          <div key={i}>
            <h3
              style={{ cursor: "pointer" }}
              onClick={() => gotoBlog(blog._id)}
            >
              Title: {blog.title}
            </h3>
            <h4>Author: {blog.author.username}</h4>
            <p>{blog.body}</p>
            <h4>comments:</h4>
            <Comments comments={blog.comments} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Blog</h1>
        <h3>Title: {blog.title}</h3>
        <h4>Author: {blog.author.username}</h4>
        <p>{blog.body}</p>
        <h4>comments:</h4>
        <Comments comments={blog.comments} />
        <button style={{ cursor: "pointer" }} onClick={() => setClicked(false)}>
          Back
        </button>
      </div>
    );
  }
};

export default Blogs;
