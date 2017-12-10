import React from "react";

function ListBooks(props) {
  const { books } = props;

  const renderBooks = books.map((book, i) => {
    return <div key={i}>Title: {book.title} / Author: {book.author}</div>;
  });
  return <div className="messages-container">{renderBooks}</div>;
}

export default ListBooks;
