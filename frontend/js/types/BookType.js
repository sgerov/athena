// @flow

import { Record } from "immutable";

export default class BookType
    extends Record({
        id: 0,
        author: "",
        comment: "",
        cover: "",
        title: "",
        published_at: new Date(),
        read_at: new Date(),
    }) {
    id: integer;
    author: string;
    comment: string;
    cover: string;
    title: string;
    published_at: Date;
    read_at: Date;
}
