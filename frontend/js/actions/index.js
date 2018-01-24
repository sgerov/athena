export * from './Book';
export * from './Url';

import { fetchUrls, fetchBooks } from '.'

export const CURRENT_USER = 'CURRENT_USER'

export const getCurrentUser = () => {
  return (dispatch) => {
    return fetch(`/api/users/me`, { credentials: 'same-origin'})
      .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
      .then(json =>
      dispatch(receiveCurrentUser(json))
    )
    }
}

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'

export const receiveCurrentUser = (json) => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: { 
      user_id: json.user ? json.user.id : null,
    }
  }
}

export const ON_DELETE = 'ON_DELETE'

export const onDelete = (id, resource) => {
  return (dispatch) => {
    return fetch(`/api/${resource}/${id}`, {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(
        response => "",
        error => console.log('An error occurred.', error)
      )
      .then((json) => {
        resource == 'urls' ? dispatch(fetchUrls()) : dispatch(fetchBooks())
      }
      )
  }
}

export const LOGIN = 'LOGIN'

export const login = (password) => {
  return (dispatch) => {
    return fetch(`/api/users/sign-in`,
      { 
        method: "post", 
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'same-origin',
        body: JSON.stringify({ password: password}),
      }).then(
        response => response,
        error => console.log('An error occurred.', error)
      )
      .then(response =>
        dispatch(getCurrentUser(response))
      )
  }
}

export const LOGOUT = 'LOGOUT'

export const logout = () => {
  return (dispatch) => {
    return fetch(`/api/users/sign-out`,
      { 
        method: "post", 
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'same-origin',
      }).then(
        response => response,
        error => console.log('An error occurred.', error)
      )
      .then(response =>
        dispatch(getCurrentUser(response))
      )
  }
}
