export const BOOK_CHANGE = 'BOOK_CHANGE'

export const bookChange = (attr, value) => {
  return {
    type: BOOK_CHANGE,
    payload: { attr, value }
  }
}

export const REQUEST_BOOKS = 'REQUEST_BOOKS'

export const requestBooks = () => {
  return {
    type: REQUEST_BOOKS,
    payload: {}
  }
}

export const RECEIVE_BOOKS = 'RECEIVE_BOOKS'

export const receiveBooks = (json) => {
  return {
    type: RECEIVE_BOOKS,
    payload: { 
      books: json.books,
      receivedAt: Date.now()
    }
  }
}

export const RECEIVE_BOOK = 'RECEIVE_BOOK'

export const receiveBook = (json) => {
  return {
    type: RECEIVE_BOOK,
    payload: { 
      book: json,
      receivedAt: Date.now()
    }
  }
}

export const FETCH_BOOKS = 'FETCH_BOOKS'

export const fetchBooks = () => {
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

export const addBook = (book) => {
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

export const BOOK_AUTOCOMPLETE = 'BOOK_AUTOCOMPLETE'

export const bookAutocomplete = (url) => {
  return (dispatch) => {
    return fetch(`http://localhost:4000/api/books/autocomplete?url=${url}`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveBook(json))
      )
  }
}