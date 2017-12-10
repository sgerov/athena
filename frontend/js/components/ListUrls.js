import React from "react";

function ListUrls(props) {
  const { urls } = props;

  const renderUrls = urls.map((url, i) => {
    return <div key={i}>Url: {url.url}</div>;
  });
  return <div className="urls-container">{renderUrls}</div>;
}

export default ListUrls;
