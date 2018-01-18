import React, { Component } from "react";
import { connect } from "react-redux";
import MainList from "../components/MainList";
import Toolbar from "../components/Toolbar";
import { fetchBooks, fetchUrls, onDelete } from "../actions/";

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
        <MainList books={books} urls={urls} onDelete={this.props.onDelete} />
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
      },
      onDelete: (id) => {
        dispatch(onDelete(id));
      }
    };
  }
)(App);

export default AppContainer;
