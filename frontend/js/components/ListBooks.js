import React from "react";

function ListBooks(props) {
    const { books } = props;

    const renderBooks = books.map((book, i) => {
            return <div key={i}>{book.title}</div>;
            });
    return <div className="messages-container">{renderBooks}</div>;
}

export default ListBooks;
