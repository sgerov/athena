import React from "react";

function ListMessages(props) {
    const { messages } = props;

    const renderMessages = messages.map((message, i) => {
            return <div key={i}>{message.title}</div>;
            });
    return <div className="messages-container">{renderMessages}</div>;
}

export default ListMessages;
