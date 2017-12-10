import React, { Component } from "react";
import { connect } from "react-redux";
import { bookAutocomplete, bookChange } from "../actions/";

class AddBook extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.bookChange(name, value)
  }

  handleAutocomplete(event) {
    this.props.bookAutocomplete(event.target.value)
  }

  handleSubmit(event) {
    this.props.addBook(this.props.book)
    event.preventDefault()
  }

  render() {
    const { book } = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input type="text" name="title" onChange={this.handleChange} value={book.title} />
        <input type="text" name="author" onChange={this.handleChange} value={book.author} />
        <input type="text" name="cover" onChange={this.handleChange} value={book.cover}/>
        <input type="text" name="published_at_guess" onChange={this.handleChange} value={book.published_at} />
        <input type="date" name="published_at" onChange={this.handleChange} />
        <input type="date" name="read_at" onChange={this.handleChange} />
        <input type="text" onChange={this.handleAutocomplete} />
        <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export const AddBookContainer = connect(
  function mapStateToProps(state) {
    return {
      book: state.newBook
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      bookAutocomplete: url => {
        dispatch(bookAutocomplete(url))
      },
      bookChange: (attr, value) => {
        dispatch(bookChange(attr, value))
      }
    };
  }
)(AddBook);

export default AddBookContainer;
