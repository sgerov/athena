// @flow
import fetch from 'cross-fetch'
import { Model, BookType } from "./types";
import { List } from "immutable";
import { combineReducers } from "redux";
import {
    SEND_MESSAGE,
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
			let items = books.model.get("items")
			for(let book of action.payload.books) {
        items = items.push(new BookType({ title: book.title }))
			}

      return Object.assign({}, books, {
        isFetching: false,
        didInvalidate: false,
				model: books.model.set("items", items),
        lastUpdated: action.receivedAt
      })
    default:
      return books;
  }
}

function sendMessage(model, payload) {
  if (payload) {
    return model.updateIn(["messages"], messages => {
      return messages.push(new BookType({ title: payload.message }));
    });
  } else {
    return model;
  }
}

const phoenixApp = combineReducers({
  books
});

export default phoenixApp;
