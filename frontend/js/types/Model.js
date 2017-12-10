// @flow
import { Record, List } from "immutable";
import BookType from "./BookType";

export default class Model
  extends Record({
    items: List()
  }) {
  items: List<BookType>;
}
