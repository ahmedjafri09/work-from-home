import React from "react";

const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, i) => (
        <p
          key={i}
        >{`${comment.author.firstName} ${comment.author.lastName}: ${comment.comment}`}</p>
      ))}
    </div>
  );
};

export default Comments;
