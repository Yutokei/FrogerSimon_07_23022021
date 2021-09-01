import React from "react";
import './style.scss'

const Error = (props) => {
  if (!props.isError) {
    return null;
  }

  return <p className="error">{props.text}</p>;
};

export default Error;
