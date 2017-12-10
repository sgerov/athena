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

const createMyStore = (urls: Array = [], books: Array = [], asyncStatus: Object = {}, newBook: Object = {}) => {
    return createStore(
      MainReducer, 
      { 
        books: books, 
        urls: urls, 
        asyncStatus: {
          isFetching: false, 
          didInvalidate: false 
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
