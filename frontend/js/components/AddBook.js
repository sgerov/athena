import React, { Component } from "react";

class AddBook extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      author: '',
      cover: '',
      published_at: '',
      read_at: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    this.props.addBook(this.state)
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input type="text" name="title" onChange={this.handleChange} />
        <input type="text" name="author" onChange={this.handleChange} />
        <input type="text" name="cover" onChange={this.handleChange} />
        <input type="date" name="published_at" onChange={this.handleChange} />
        <input type="date" name="read_at" onChange={this.handleChange} />
        <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export default AddBook;
