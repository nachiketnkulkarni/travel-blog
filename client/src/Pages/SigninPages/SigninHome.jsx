import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardDeck, Container, Row } from "react-bootstrap";
import CardComponent from "../../Components/CardComponent";
import Loading from "../../Components/Loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import EditPostModal from "./EditPostModal";

function SigninHome(props) {
  const [data, setData] = useState(null);
  const [blogPost, setBlogPost] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const headers = {
      authorization: "Bearer " + localStorage.getItem("authToken"),
    };
    try {
      //console.log(headers);
      const posts = await axios.post("/post/getUserPost", {}, { headers });

      setData(posts.data.data);
    } catch (error) {
      setData(null);
    }
  };

  const deletingPost = async (id) => {
    setData(null);
    const headers = {
      authorization: "Bearer " + localStorage.getItem("authToken"),
    };
    try {
      axios
        .delete(`/post/deletePost/${id}`, { headers })
        .then(() => getData())
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = (blog) => {
    setIsEdit(true);
    setBlogPost(blog);
  };

  const handleClose = () => {
    setIsEdit(false);
    setBlogPost(null);
    getData();
  };

  const deletePost = (id) => {
    confirmAlert({
      title: "Confirm to delete ?",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deletingPost(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  if (data === null) {
    return (
      <>
        <Loading />
      </>
    );
  } else if (data.length === 0) {
    return (
      <div style={{ height: "100vh", margin: "auto", textAlign: "center" }}>
        <h1>No posts available. To view add posts.</h1>
      </div>
    );
  } else
    return (
      <div>
        <Container>
          <Row>
            <CardDeck>
              {data &&
                data.map((blog) => {
                  //console.log(blog);
                  return (
                    <CardComponent
                      key={blog._id}
                      blog={blog}
                      Home
                      Edit
                      deletePost={deletePost}
                      editPost={editPost}
                    />
                  );
                })}
            </CardDeck>
            <EditPostModal
              show={isEdit}
              onHide={handleClose}
              blog={blogPost}
              {...props}
            />
          </Row>
        </Container>
      </div>
    );
}

export default SigninHome;
