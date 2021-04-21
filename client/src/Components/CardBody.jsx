import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function CardBody(props) {
  return (
    <Card.Body className={props.Blog && "col-md-8"}>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text className='lineClamp'>{props.description}</Card.Text>
      <Link to={`/post/${props.id}`} className='ml-auto'>
        <span className='float-right'>View</span>
      </Link>
    </Card.Body>
  );
}

export default CardBody;
