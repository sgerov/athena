// @flow
import fetch from 'cross-fetch'
import { List } from "immutable";
import { Model, BookType } from "../types";
import {
    ADD_BOOK,
    FETCH_BOOKS,
    BOOK_AUTOCOMPLETE,
    BOOK_CHANGE,
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
    RECEIVE_BOOK,
} from '../actions/'

const init = new Model();

export const newBook = (
  newBook = {
    title: '',
    author: '',
    cover: '',
    published_at: '',
    read_at: ''
  },
  action: { type: string, payload: Object }
) => {
  switch (action.type) {
    case RECEIVE_BOOK:
      return Object.assign({}, newBook, action.payload.book)
    case BOOK_CHANGE:
      return Object.assign({}, newBook, { [action.payload.attr]: action.payload.value})
    default:
      return newBook;
  }
}

export const books = (
  books = {
    model: init,
    isFetching: false,
    didInvalidate: false,
  },
  action: { type: string, payload: Object }
) => {
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
