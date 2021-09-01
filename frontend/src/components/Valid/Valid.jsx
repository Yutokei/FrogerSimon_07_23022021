import React from "react";
import "./style.scss";

const Valid = (props) => {

  if (!props.isValid) {
    return null;
  }

  return <p className="valid">{props.text}</p>;
};

export default Valid;
