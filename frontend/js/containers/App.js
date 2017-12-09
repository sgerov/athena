import React, { Component } from "react";
import { connect } from "react-redux";
import ListMessages from "../components/ListMessages";
import Actions from "../actions";

class App extends Component {
  componentWillMount() {
    this.props.fetchBooks();
  }

  render() {
    const { messages, sendMessageToChannel } = this.props;
    let input;

    return (
      <div>
        <ListMessages messages={messages} />
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
      messages: state.chat.get("messages"),
      books: state.books.items
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
