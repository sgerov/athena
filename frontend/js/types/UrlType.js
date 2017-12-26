// @flow

import { Record } from "immutable";

export default class UrlType
    extends Record({
        title: "",
        score: 0,
        url: "",
        preview: "",
        images: [],
    }) {
    title: string;
    url: string;
    preview: string;
    images: array;
    score: number;
}
