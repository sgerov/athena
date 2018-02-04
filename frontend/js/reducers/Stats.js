import {
  RECEIVE_BOOK_GRAPH,
  RECEIVE_URL_GRAPH,
} from '../actions/'

export const bookGraph = (
  state = {},
  action: { type: string, payload: Object }
) => {
  switch (action.type) {
    case RECEIVE_BOOK_GRAPH:
      return action.payload;
    default:
      return state;
  }
}

export const urlGraph = (
  state = {},
  action: { type: string, payload: Object }
) => {
  switch (action.type) {
    case RECEIVE_URL_GRAPH:
      return action.payload;
    default:
      return state;
  }
}
