// @flow
import { books, bookAsyncStatus, newBook } from "./Book"
import { urls, urlAsyncStatus, newUrl } from "./Url"
import { combineReducers } from "redux";

const phoenixApp = combineReducers({
  books,
  urls,
  newBook,
  newUrl,
  bookAsyncStatus,
  urlAsyncStatus,
});

export default phoenixApp;
