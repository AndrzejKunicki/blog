import React from "react";
import "./CommentList.scss";

const CommentList = ({ comments }) => {
  return (
    <ul>
      {comments.map(({ name, message, date }) => (
        <li key={name} className="list_item">
          <p className="date">{date}</p>
          <p className="name">{name}</p>
          <p className="message">{message}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
