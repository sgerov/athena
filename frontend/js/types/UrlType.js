// @flow

import { Record } from "immutable";

export default class UrlType
    extends Record({
      title: "",
      score: 0,
      url: "",
      preview: "",
      paragraph: "",
      summary: "",
      images: [],
    }) {
    title: string;
    url: string;
    preview: string;
    paragraph: string;
    summary: string;
    images: array;
    score: number;
}
