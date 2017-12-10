// @flow
import { books, newBook } from "./Book"
import { combineReducers } from "redux";

const phoenixApp = combineReducers({
  books,
  newBook
});

export default phoenixApp;
