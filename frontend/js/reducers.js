// @flow
import fetch from 'cross-fetch'
import { Model, MessageType } from "./types";
import { List } from "immutable";
import { combineReducers } from "redux";
import {
    SEND_MESSAGE,
    REQUEST_BOOKS,
    RECEIVE_BOOKS
} from './actions'

const init = new Model();

function mainReducer(
  model: Model = init,
  action: { type: ActionType, payload: Object }
) {
  switch (action.type) {
    case "SEND_MESSAGE":
      return sendMessage(model, action.payload);
    default:
      return model;
  }
}

function sendMessage(model, payload) {
  if (payload) {
    return model.updateIn(["messages"], messages => {
      return messages.push(new MessageType({ title: payload.message }));
    });
  } else {
    return model;
  }
}

function books(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_BOOKS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_BOOKS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.payload.messages,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const phoenixApp = combineReducers({
  chat: mainReducer,
  books
});

export default phoenixApp;
