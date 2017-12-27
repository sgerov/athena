import React, { Component } from "react";
import { connect } from "react-redux";
import ListBooks from "../components/ListBooks";
import Toolbar from "../components/Toolbar";
import NewBook from "./NewBook";
import NewUrl from "./NewUrl";
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
        <Toolbar />
				<ListBooks books={books} urls={urls} />
        <NewBook />
        <NewUrl />
      </div>
    );
  }
}

const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      books: state.books.items,
      urls: state.urls.items,
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
