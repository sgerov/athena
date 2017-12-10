import React, { Component } from "react";
import { connect } from "react-redux";
import ListBooks from "../components/ListBooks";
import ListUrls from "../components/ListUrls";
import NewBook from "./NewBook";
import { fetchBooks, fetchUrls } from "../actions/";

class App extends Component {
  componentWillMount() {
    this.props.fetchBooks();
    this.props.fetchUrls();
  }

  render() {
    const { urls, books } = this.props;

    return (
      <div>
        <ListBooks books={books} />
        <ListUrls urls={urls} />
        <NewBook />
      </div>
    );
  }
}

const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      books: state.books,
      urls: state.urls,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      fetchBooks: () => {
        dispatch(fetchBooks());
      },
      fetchUrls: () => {
        dispatch(fetchUrls());
      }
    };
  }
)(App);

export default AppContainer;
