import React, { Component } from "react";
import Container from "./component/Container";
import Modal from "./component/Modal";
import PostAddForm from "./component/PostAddForm";
import PostEditForm from "./component/PostEditForm";
import CommentAddForm from "./component/CommentAddForm";
import PostList from "./component/PostList";
import { v4 as uuidv4 } from "uuid";
import s from "./component/Container/Container.module.css";
// import ThreeDRotation from "@material-ui/icons/ThreeDRotation";
// import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import AddCircleIcon from "@material-ui/icons/AddCircle";

class App extends Component {
  state = {
    posts: [
      {
        id: "1",
        title: "Post 1",
        message:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatum dolor eveniet odit nobis dignissimos facere fugit dolorum architecto, delectus eos aperiam quibusdam, qui incidunt nulla est tempore exercitationem dicta numquam. Odio odit, vel eveniet placeat ad non corporis! Odit est ipsa a odio veniam minima similique doloribus, sit architecto.",
        comments: [],
      },
      {
        id: "2",
        title: "Post 2",
        message:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur voluptatum dolor eveniet odit nobis dignissimos facere fugit dolorum architecto, delectus eos aperiam quibusdam, qui incidunt nulla est tempore exercitationem dicta numquam. Odio odit, vel eveniet placeat ad non corporis! Odit est ipsa a odio veniam minima similique doloribus, sit architecto.",
        comments: [],
      },
    ],
    currentPost: {},
    showModalAdd: false,
    showModalEdit: false,
    showModalCommentAdd: false,
  };

  ////toggle modal

  toggleModalAdd = () => {
    this.setState(({ showModalAdd }) => ({ showModalAdd: !showModalAdd }));
  };
  toggleModalEdit = () => {
    this.setState(({ showModalEdit }) => ({ showModalEdit: !showModalEdit }));
  };
  toggleModalCommentAdd = () => {
    this.setState(({ showModalCommentAdd }) => ({
      showModalCommentAdd: !showModalCommentAdd,
    }));
  };

  ///add post

  addPost = ({ title, message }) => {
    const post = {
      id: uuidv4(),
      title,
      message,
      comments: [],
    };

    this.setState(({ posts }) => ({
      posts: [post, ...posts],
    }));

    this.toggleModalAdd();
  };

  ///delete post
  deletePost = (postId) => {
    this.setState((prevState) => ({
      posts: prevState.posts.filter((post) => post.id !== postId),
    }));
  };

  //edit post

  saveEditPost = (updatePost) => {
    /////////////////////

    // this.deletePost(updatePost.id);

    // this.setState(({ posts }) => ({
    //   posts: [updatePost, ...posts],
    // }));

    ///////////////////////
    const updatedPost = Object.assign(
      this.getCurrentPost(updatePost.id),
      updatePost
    );

    const newPosts = Object.assign(this.state.posts, updatedPost);

    this.setState({
      posts: newPosts,
    });

    this.toggleModalEdit();
  };

  /// get set current post

  setCurrentPost = (postId) => {
    this.setState({ currentPost: this.getCurrentPost(postId) });

    this.toggleModalEdit();
  };

  getCurrentPost = (postId) => {
    return this.state.posts.find((post) => post.id === postId);
  };

  ///add comment

  addComment = (postId) => {
    this.setState({ currentPost: this.getCurrentPost(postId) });

    this.toggleModalCommentAdd();
  };

  saveComment = ({ name, message, id }) => {
    this.deletePost(id);

    const newComments = {
      date: this.timeConverter(Math.floor(Date.now() / 1000)),
      message,
      name,
    };

    const updatePost = this.state.currentPost;
    updatePost.comments = [...updatePost.comments, newComments];

    this.setState(({ posts }) => ({
      posts: [updatePost, ...posts],
    }));

    this.toggleModalCommentAdd();
  };

  timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = "0" + a.getMinutes();
    let sec = "0" + a.getSeconds();
    let time = `${date} ${month} ${year} ${hour}:${min.substr(-2)}:${sec.substr(
      -2
    )}`;

    return time;
  };

  render() {
    const {
      showModalAdd,
      showModalEdit,
      showModalCommentAdd,
      posts,
      currentPost,
    } = this.state;

    return (
      <Container>
        <h2 className={s.blog}>Blog</h2>
        <button
          type="button"
          onClick={this.toggleModalAdd}
          className={s.btn_add}
        >
          <AddCircleIcon />
        </button>
        {posts.length > 0 && (
          <PostList
            options={posts}
            deletePost={this.deletePost}
            getCurrentPost={this.getCurrentPost}
            setCurrentPost={this.setCurrentPost}
            addComment={this.addComment}
          />
        )}

        {showModalAdd && (
          <Modal onClose={this.toggleModalAdd}>
            <PostAddForm onSubmit={this.addPost} />
          </Modal>
        )}
        {showModalEdit && (
          <Modal onClose={this.toggleModalEdit}>
            <PostEditForm onSubmit={this.saveEditPost} options={currentPost} />
          </Modal>
        )}
        {showModalCommentAdd && (
          <Modal onClose={this.toggleModalCommentAdd}>
            <CommentAddForm onSubmit={this.saveComment} options={currentPost} />
          </Modal>
        )}
      </Container>
    );
  }
}

export default App;
