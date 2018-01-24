export const URL_CHANGE = 'URL_CHANGE'

export const urlChange = (attr, value) => {
  return {
    type: URL_CHANGE,
    payload: { attr, value }
  }
}

export const REQUEST_URLS = 'REQUEST_URLS'

export const requestUrls = (page) => {
  return {
    type: REQUEST_URLS,
    payload: { page: page }
  }
}

export const RECEIVE_URLS = 'RECEIVE_URLS'

export const receiveUrls = (json) => {
  return {
    type: RECEIVE_URLS,
    payload: { 
      urls: json.urls,
			total: json.total,
      receivedAt: Date.now()
    }
  }
}

export const RECEIVE_URL = 'RECEIVE_URL'

export const receiveUrl = (link, json) => {
  let url = json
  url.url = link
  url.preview = json.images[0]

  return {
    type: RECEIVE_URL,
    payload: { 
      url,
      receivedAt: Date.now()
    }
  }
}

export const FETCH_URLS = 'FETCH_URLS'

export const fetchUrls = (page = 1) => {
  return (dispatch) => {
    dispatch(requestUrls(page))

    return fetch(`/api/urls?page=${page}`)
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
    return fetch(`/api/urls`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        title: url.title,
        url: url.url,
        preview: url.preview,
        paragraph: url.paragraph,
        score: url.score,
        summary: url.summary,
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
    return fetch(`/api/urls/autocomplete?url=${url}`)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveUrl(url, json))
      )
  }
}

