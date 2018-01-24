import React, { Component } from "react";
import { connect } from "react-redux";
import MainList from "../components/MainList";
import Toolbar from "../components/Toolbar";
import { fetchBooks, fetchUrls, onDelete, getCurrentUser } from "../actions/";

class App extends Component {
  componentWillMount() {
    this.props.fetchBooks();
    this.props.fetchUrls();
    this.props.getCurrentUser();
  }

  render() {
    const { urls, books, currentUser } = this.props;

    return (
      <div>
        <Toolbar />
        <MainList books={books} urls={urls} onDelete={this.props.onDelete} currentUser={currentUser} />
      </div>
    );
  }
}

const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      books: state.books.items,
      urls: state.urls.items,
      currentUser: state.currentUser,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      fetchBooks: () => {
        dispatch(fetchBooks());
      },
      fetchUrls: () => {
        dispatch(fetchUrls());
      },
      onDelete: (id, resource) => {
        dispatch(onDelete(id, resource));
      },
      getCurrentUser: () => {
        dispatch(getCurrentUser());
      }
    };
  }
)(App);

export default AppContainer;
