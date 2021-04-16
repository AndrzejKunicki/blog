import React, { Component } from "react";

import "./PostAddForm.scss";

class PostAddForm extends Component {
  state = {
    title: "",
    message: "",
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: "", message: "" });
  };

  render() {
    const { title, message } = this.state;

    return (
      <form className="PostAdd" onSubmit={this.handleSubmit}>
        <h2 className="Title">Add post</h2>

        <label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="title"
            onChange={this.handleChange}
            className="PostAdd__title"
          />
        </label>
        <textarea
          className="PostAdd__textarea"
          name="message"
          value={message}
          onChange={this.handleChange}
        ></textarea>
        <button type="submit" className="PostAdd__button">
          Add
        </button>
      </form>
    );
  }
}

export default PostAddForm;
