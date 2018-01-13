// @flow

import { Record } from "immutable";

export default class UrlType
    extends Record({
      title: "",
      score: 0,
      url: "",
      preview: "",
      paragraph: "",
      images: [],
    }) {
    title: string;
    url: string;
    preview: string;
    paragraph: string;
    images: array;
    score: number;
}
