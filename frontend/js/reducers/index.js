// @flow
import { books, bookAsyncStatus, newBook } from "./Book"
import { urls, urlAsyncStatus, newUrl } from "./Url"
import { combineReducers } from "redux";
import {
  RECEIVE_CURRENT_USER,
} from '../actions/'

const currentUser = (
  state = {},
  action: { type: string, payload: Object }
) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}

const phoenixApp = combineReducers({
  books,
  urls,
  newBook,
  newUrl,
  bookAsyncStatus,
  urlAsyncStatus,
  currentUser,
});

export default phoenixApp;
