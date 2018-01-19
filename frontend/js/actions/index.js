export * from './Book';
export * from './Url';

import { fetchUrls, fetchBooks } from '.'

export const ON_DELETE = 'ON_DELETE'

export const onDelete = (id, resource) => {
  return (dispatch) => {
    return fetch(`/api/${resource}/${id}`, {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
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

