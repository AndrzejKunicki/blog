import React from "react";
import CommentList from "../CommentList";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import "./PostList.scss";

const PostList = ({ addComment, setCurrentPost, deletePost, options }) => {
  return (
    <ul className="PostList">
      {options.map(({ title, message, id, comments }) => (
        <li key={id}>
          <h2>{title}</h2>
          <p>{message}</p>

          <button
            type="button"
            onClick={() => {
              deletePost(id);
            }}
            className="btn_edit"
          >
            <DeleteForeverIcon />
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentPost(id);
            }}
            className="btn_edit"
          >
            <EditIcon />
          </button>

          <button
            type="button"
            onClick={() => {
              addComment(id);
            }}
            className="btn_add"
          >
            ADD COMMENT
          </button>
          {comments.length > 0 && <CommentList comments={comments} />}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
