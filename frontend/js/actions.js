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

function addBook(title) {
	return (dispatch) => {
		return fetch(`http://localhost:4000/api/books`, {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},

			//make sure to serialize your JSON body
			body: JSON.stringify({
				title: title,
				author: "exampleAuthor",
        comment: "comment",
				cover: "cover",
				published_at: "2015-01-01",
				read_at: "2017-01-01",
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
