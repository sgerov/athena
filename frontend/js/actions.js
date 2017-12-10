export const SEND_MESSAGE = 'SEND_MESSAGE'

function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    payload: {
      message
    }
  };
}

export const REQUEST_BOOKS = 'REQUEST_BOOKS'

function requestBooks() {
  return {
    type: REQUEST_BOOKS,
    payload: {}
  }
}

export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'

function receiveBooks(json) {
  return {
    type: RECEIVE_BOOKS,
    payload: { 
      books: json.books.map(book => { return { title: book.title } }),
      receivedAt: Date.now()
    }
  }
}

// store.dispatch(fetchBooks())
function fetchBooks() {
  return (dispatch) => {
    dispatch(requestBooks())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://localhost:4000/api/books`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveBooks(json))
      )
  }
}

export default { sendMessage, requestBooks, fetchBooks};
