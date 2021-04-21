import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FontAwasomImage(props) {
  return (
    <FontAwesomeIcon
      icon={props.icon}
      onClick={props.onClick ? props.onClick : {}}
      id={props.id}
      color={props.color ? props.color : "black"}
      size={props.size ? props.size : "sm"}
    />
  );
}

export default FontAwasomImage;
