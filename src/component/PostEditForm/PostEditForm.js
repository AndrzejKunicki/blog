import React, { Component } from "react";
import "./PostEditForm.scss";

class PostEditForm extends Component {
  state = {
    title: "",
    message: "",
  };

  componentDidMount() {
    this.setState({
      title: this.props.options.title,
      message: this.props.options.message,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { title, message } = this.state;
    e.preventDefault();
    const updatePost = {
      comments: this.props.options.comments,
      id: this.props.options.id,
      title,
      message,
    };
    this.props.onSubmit(updatePost);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: "", message: "" });
  };

  render() {
    const { title, message } = this.state;

    return (
      <form className="PostEditor" onSubmit={this.handleSubmit}>
        <h2 className="Edit">Edit post</h2>
        <label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="title"
            onChange={this.handleChange}
            className="PostEditor__title"
          />
        </label>
        <textarea
          className="PostEditor__textarea"
          name="message"
          value={message}
          onChange={this.handleChange}
        ></textarea>
        <button type="submit" className="PostEditor__button">
          Save
        </button>
      </form>
    );
  }
}

export default PostEditForm;
