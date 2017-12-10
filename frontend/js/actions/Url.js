export const URL_CHANGE = 'URL_CHANGE'

export const urlChange = (attr, value) => {
  return {
    type: URL_CHANGE,
    payload: { attr, value }
  }
}

export const REQUEST_URLS = 'REQUEST_URLS'

export const requestUrls = () => {
  return {
    type: REQUEST_URLS,
    payload: {}
  }
}

export const RECEIVE_URLS = 'RECEIVE_URLS'

export const receiveUrls = (json) => {
  return {
    type: RECEIVE_URLS,
    payload: { 
      urls: json.urls,
      receivedAt: Date.now()
    }
  }
}

export const RECEIVE_URL = 'RECEIVE_URL'

export const receiveUrl = (json) => {
  return {
    type: RECEIVE_URL,
    payload: { 
      url: json,
      receivedAt: Date.now()
    }
  }
}

export const FETCH_URLS = 'FETCH_URLS'

export const fetchUrls = () => {
  return (dispatch) => {
    dispatch(requestUrls())

    return fetch(`http://localhost:4000/api/urls`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveUrls(json))
      )
  }
}

export const ADD_URL = 'ADD_URL'

export const addUrl = (url) => {
  return (dispatch) => {
    return fetch(`http://localhost:4000/api/urls`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: url.title,
        author: url.author,
        comment: "TODO",
        cover: url.cover,
        published_at: url.published_at,
        read_at: url.read_at,
      })
    })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(fetchUrls())
      )
  }
}

export const URL_AUTOCOMPLETE = 'URL_AUTOCOMPLETE'

export const urlAutocomplete = (url) => {
  return (dispatch) => {
    return fetch(`http://localhost:4000/api/urls/autocomplete?url=${url}`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveUrl(json))
      )
  }
}
