import React, { Component } from "react";
import "./CommentAddForm.scss";

class CommentAddForm extends Component {
  state = {
    name: "",
    message: "",
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { name, message } = this.state;

    e.preventDefault();

    const comment = {
      id: this.props.options.id,
      name,
      message,
    };

    this.props.onSubmit(comment);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: "", message: "" });
  };

  render() {
    const { name, message } = this.state;

    return (
      <form className="PostAdd" onSubmit={this.handleSubmit}>
        <h2 className="Title">Add comment</h2>

        <label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="name"
            onChange={this.handleChange}
            className="Comment__title"
          />
        </label>
        <textarea
          className="PostAdd__textarea"
          name="message"
          value={message}
          onChange={this.handleChange}
        ></textarea>
        <button type="submit" className="PostAdd__button">
          Add comment
        </button>
      </form>
    );
  }
}

export default CommentAddForm;
