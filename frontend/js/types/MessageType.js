// @flow

import { Record } from "immutable";

export default class MessageType
    extends Record({
        author: "",
        comment: "",
        cover: "",
        title: "",
        published_at: new Date(),
        read_at: new Date(),
    }) {
    author: string;
    comment: string;
    cover: string;
    title: string;
    published_at: Date;
    read_at: Date;
}
