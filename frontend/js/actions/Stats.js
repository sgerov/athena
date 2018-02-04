export const REQUEST_BOOK_GRAPH = 'REQUEST_BOOK_GRAPH'

export const requestBookGraph = () => {
  return (dispatch) => {
    return fetch(`/api/books/graph`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveBookGraph(json))
      )
  }
}

export const RECEIVE_BOOK_GRAPH = 'RECEIVE_BOOK_GRAPH'

export const receiveBookGraph = (data) => {
  return {
    type: RECEIVE_BOOK_GRAPH,
    payload: data
  }
}

export const REQUEST_URL_GRAPH = 'REQUEST_URL_GRAPH'

export const requestUrlGraph = () => {
  return (dispatch) => {
    return fetch(`/api/urls/graph`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveUrlGraph(json))
      )
  }
}

export const RECEIVE_URL_GRAPH = 'RECEIVE_URL_GRAPH'

export const receiveUrlGraph = (data) => {
  return {
    type: RECEIVE_URL_GRAPH,
    payload: data
  }
}

