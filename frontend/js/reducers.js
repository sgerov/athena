// @flow
import fetch from 'cross-fetch'
import { Model, BookType } from "./types";
import { List } from "immutable";
import { combineReducers } from "redux";
import {
    ADD_BOOK,
    FETCH_BOOKS,
    REQUEST_BOOKS,
    RECEIVE_BOOKS
} from './actions'

const init = new Model();

function books(
  books = {
    model: init,
    isFetching: false,
    didInvalidate: false,
  },
  action: { type: string, payload: Object }
) {
  switch (action.type) {
    case REQUEST_BOOKS:
      return Object.assign({}, books, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_BOOKS:
      const items = action.payload.books.map( book => {
        return new BookType({ 
          title: book.title,
          author: book.author,
        })
       })

      return Object.assign({}, books, {
        isFetching: false,
        didInvalidate: false,
        model: books.model.set("items", List(items)),
        lastUpdated: action.receivedAt
      })
    default:
      return books;
  }
}

const phoenixApp = combineReducers({
  books
});

export default phoenixApp;
