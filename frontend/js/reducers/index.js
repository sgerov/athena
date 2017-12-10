// @flow
import { books, bookAsyncStatus, newBook } from "./Book"
import { urls, urlAsyncStatus } from "./Url"
import { combineReducers } from "redux";

const phoenixApp = combineReducers({
  books,
  urls,
  newBook,
  bookAsyncStatus,
  urlAsyncStatus,
});

export default phoenixApp;
