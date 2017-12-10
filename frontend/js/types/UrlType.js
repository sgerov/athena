// @flow

import { Record } from "immutable";

export default class UrlType
    extends Record({
        title: "",
        url: "",
        preview: "",
        images: [],
    }) {
    title: string;
    url: string;
    preview: string;
    images: array;
}
