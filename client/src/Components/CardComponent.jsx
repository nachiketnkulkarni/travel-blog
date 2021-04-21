import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { ConvertDate } from "../Healpers/Functions/Functions";
import CardBody from "./CardBody";
import CardImage from "./CardImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

function CardComponent(props) {
  const { blog } = props;
  // console.log(blog);
  return (
    <Col md={props.Home && 4}>
      <Card className={props.Blog ? "m-4" : "m-2"}>
        <Row>
          {props.Blog ? (
            <>
              <CardImage Blog img={blog.imageLink} {...props} />
              <CardBody
                title={blog.title}
                description={blog.description}
                id={blog._id}
                Blog
              />
            </>
          ) : (
            <>
              <CardImage img={blog.imageLink} {...props} />
              <CardBody
                title={blog.title}
                description={blog.description}
                id={blog._id}
                date={blog.date}
              />
              <Card.Footer style={{ width: "100%" }}>
                {props.Edit && (
                  <span>
                    <Button
                      variant='link'
                      onClick={() => props.deletePost(props.blog._id)}
                      id={blog._id}>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        id={blog._id}
                        color='red'
                        size='sm'
                      />
                    </Button>

                    <Button
                      variant='link'
                      onClick={() => props.editPost(blog)}
                      id={blog._id}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        id={blog._id}
                        size='sm'
                        color='black'
                      />
                    </Button>
                  </span>
                )}
                <span style={{ float: "right" }}>{ConvertDate(blog.date)}</span>
              </Card.Footer>
            </>
          )}
        </Row>
      </Card>
    </Col>
  );
}

export default CardComponent;
