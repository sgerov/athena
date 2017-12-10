import React, { Component } from "react";
import { connect } from "react-redux";
import ListBooks from "../components/ListBooks";
import AddBook from "../components/AddBook";
import { addBook, fetchBooks } from "../actions/";

class App extends Component {
  componentWillMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, addBook } = this.props;

    return (
      <div>
        <ListBooks books={books} />
        <AddBook addBook={addBook} />
      </div>
    );
  }
}

const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      books: state.books.model.get("items")
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      addBook: message => {
        dispatch(addBook(message));
      },
      fetchBooks: () => {
        dispatch(fetchBooks());
      }
    };
  }
)(App);

export default AppContainer;
