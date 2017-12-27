// @flow

import MainReducer from "./reducers/";
import { Model } from "./types";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

function composeWithApplyMiddlewares() {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        return compose(
                applyMiddleware(thunk),
                window.__REDUX_DEVTOOLS_EXTENSION__()
                );
    }
    return compose(applyMiddleware(thunk));
}

const createMyStore = (urls: Object = { items: [], total: 0}, books: Object = { items: [], total: 0}, bookAsyncStatus: Object = {}, urlAsyncStatus: Object = {}, newBook: Object = {}, newUrl: Object = {}) => {
    return createStore(
      MainReducer, 
      { 
        books: books, 
        urls: urls, 
        bookAsyncStatus: {
          isFetching: false, 
          didInvalidate: false,
          page: 0,
        },
        urlAsyncStatus: {
          isFetching: false, 
          didInvalidate: false,
					page: 0,
        },
        newBook: {
          title: '',
          author: '',
          published_at: '',
          read_at: '',
        }
      },
      composeWithApplyMiddlewares()
    );
};

export default createMyStore();
