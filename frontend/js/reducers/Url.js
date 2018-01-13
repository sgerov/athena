// @flow
import fetch from 'cross-fetch'
import { List } from "immutable";
import { UrlType } from "../types";
import {
    ADD_URL,
    FETCH_URLS,
    URL_AUTOCOMPLETE,
    URL_CHANGE,
    REQUEST_URLS,
    RECEIVE_URLS,
    RECEIVE_URL,
} from '../actions/'

export const newUrl = (
  newUrl = {
    score: 0,
    title: '',
    url: '',
    preview: '',
    paragraph: '',
    images: [],
  },
  action: { type: string, payload: Object }
) => {
  switch (action.type) {
    case RECEIVE_URL:
      return Object.assign({}, newUrl, action.payload.url)
    case URL_CHANGE:
      return Object.assign({}, newUrl, { [action.payload.attr]: action.payload.value})
    default:
      return newUrl;
  }
}

export const urlAsyncStatus = (
  state = {
    isFetching: false,
    didInvalidate: false,
		page: 0
  },
  action: { type: string, payload: Object }
) => {
  switch (action.type) {
    case REQUEST_URLS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
				page: action.payload.page
      })
    default:
      return state;
  }
}

export const urls = (
  state = [],
  action: { type: string, payload: Object }
) => {
  switch (action.type) {
    case RECEIVE_URLS:
      const items = action.payload.urls.map( url => {
        return new UrlType({ 
          title: url.title,
          url: url.url,
          preview: url.preview,
          paragraph: url.paragraph,
          score: parseInt(url.score || 0),
        })
       })


			return {items: List(items), total: action.payload.total}
    default:
      return state;
  }
}
