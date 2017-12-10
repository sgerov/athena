import React, { Component } from "react";
import { connect } from "react-redux";
import ListBooks from "../components/ListBooks";
import Actions from "../actions";

class App extends Component {
  componentWillMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, sendMessageToChannel } = this.props;
    let input;

    return (
      <div>
        <ListBooks books={books} />
        <input type="text" ref={node => input = node} />
        <button onClick={() => sendMessageToChannel(input.value)}>
          SEND
        </button>
      </div>
    );
  }
}

export const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      books: state.books.model.get("items"),
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      sendMessageToChannel: message => {
        dispatch(Actions.sendMessage(message));
      },
      fetchBooks: () => {
        dispatch(Actions.fetchBooks());
      }
    };
  }
)(App);

export default AppContainer;
