import React, { Component } from "react";
import { connect } from "react-redux";
import MainList from "../components/MainList";
import Toolbar from "../components/Toolbar";
import { fetchBooks, fetchUrls, onDelete, getCurrentUser, requestBookGraph, requestUrlGraph } from "../actions/";

class App extends Component {
  componentWillMount() {
    this.props.fetchBooks();
    this.props.fetchUrls();
    this.props.getCurrentUser();
    this.props.requestBookGraph();
    this.props.requestUrlGraph();
  }

  render() {
    const { urls, books, currentUser, bookGraph, urlGraph } = this.props;

    return (
      <div>
        <Toolbar />
        <MainList books={books} urls={urls} onDelete={this.props.onDelete} currentUser={currentUser} bookGraph={bookGraph} urlGraph={urlGraph} />
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
      urlGraph: state.urlGraph,
      bookGraph: state.bookGraph
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
      },
      requestBookGraph: () => {
        dispatch(requestBookGraph());
      },
      requestUrlGraph: () => {
        dispatch(requestUrlGraph());
      }
    };
  }
)(App);

export default AppContainer;
