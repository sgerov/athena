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
      books: json.books,
      receivedAt: Date.now()
    }
  }
}

export const FETCH_BOOKS = 'FETCH_BOOKS'

function fetchBooks() {
  return (dispatch) => {
    dispatch(requestBooks())

    return fetch(`http://localhost:4000/api/books`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveBooks(json))
      )
  }
}

export const ADD_BOOK = 'ADD_BOOK'

function addBook(book) {
  return (dispatch) => {
    return fetch(`http://localhost:4000/api/books`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        comment: "TODO",
        cover: book.cover,
        published_at: book.published_at,
        read_at: book.read_at,
      })
    })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(fetchBooks())
      )
  }
}


export default { addBook, requestBooks, fetchBooks};
