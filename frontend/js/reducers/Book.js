// @flow
import fetch from 'cross-fetch'
import { List } from "immutable";
import { BookType } from "../types";
import {
    ADD_BOOK,
    FETCH_BOOKS,
    BOOK_AUTOCOMPLETE,
    BOOK_CHANGE,
    REQUEST_BOOKS,
    RECEIVE_BOOKS,
    RECEIVE_BOOK,
} from '../actions/'

export const newBook = (
  newBook = {
    id: 0,
    title: '',
    author: '',
    cover: '',
    published_at: '',
    read_at: '',
    comment: ''
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

export const bookAsyncStatus = (
  state = {
    isFetching: false,
    didInvalidate: false,
  },
  action: { type: string, payload: Object }
) => {
  switch (action.type) {
    case REQUEST_BOOKS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
				page: action.payload.page
      })
    default:
      return state;
  }
}

export const books = (
  state = [],
  action: { type: string, payload: Object }
) => {
  switch (action.type) {
    case RECEIVE_BOOKS:
      const items = action.payload.books.map( book => {
        return new BookType({ 
          id: book.id,
          title: book.title,
          comment: book.comment,
          cover: book.cover,
          author: book.author,
          published_at: book.published_at,
          read_at: book.read_at,
        })
       })


      return {items: List(items), total: action.payload.total}
    default:
      return state;
  }
}
