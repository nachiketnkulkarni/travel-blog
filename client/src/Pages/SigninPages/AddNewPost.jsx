import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import FormInput, {
  FormTextArea,
  FormUploadFile,
} from "../../Components/FormInput";
import Loading from "../../Components/Loading";
import { initialAddNewPostValues } from "../../Healpers/FormInitialValues";
import { CheckLogin } from "../../Healpers/Functions/Functions";
import { SigninNavBarMenus } from "../../Healpers/NavBarMenu";
import Header from "../Header";
import { addPostSchema } from "../../Healpers/FormSchemas";

function AddNewPost(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [errorPresent, setErrorPresent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (CheckLogin()) {
      setIsLogin(true);
    }
  }, []);

  if (!isLogin) {
    <Redirect to='/' />;
  }

  // function addPost(params) {}

  const headers = {
    authorization: "Bearer " + localStorage.getItem("authToken"),
  };

  const sendData = async (val) => {
    setLoading(true);

    let response;
    let message;
    try {
      if (props.edit) {
        response = await axios.put(`/updatePost/${val.id}`, val, {
          headers,
        });
        message = "Post updated succesfully";
      } else {
        response = await axios.post("/post/add", val, {
          headers,
        });
        message = "Post added succesfully";
      }
      if (!response.data.success) {
        setErrorPresent(response.data.error);
      }

      await sendAlert(message, false);
    } catch (error) {
      sendAlert(error.message, true);
    }
  };

  const sendAlert = (message, err) => {
    setLoading(false);
    alert(message);
    if (!err) {
      props.edit ? props.onHide() : props.history.push("/home");
    }
  };

  if (loading) {
    return <Loading />;
  }

  // console.log(props.blog);
  const updateValues = {
    id: props.blog ? props.blog._id : null,
    title: props.blog ? props.blog.title : "",
    location: props.blog ? props.blog.location : "",
    description: props.blog ? props.blog.description : "",
    videoLink: props.blog ? props.blog.videoLink : "",
    imageLink: props.blog ? props.blog.imageLink : "",
  };

  const onSubmit = async (values) => {
    sendData(values);
  };

  return (
    <>
      {props.edit ? null : (
        <Header navBarMenus={SigninNavBarMenus} type='SigninHome' />
      )}

      <div className='mb-5' style={props.edit ? {} : { minHeight: "78vh" }}>
        <Container>
          {errorPresent && <h5>{errorPresent}</h5>}
          <Formik
            initialValues={props.edit ? updateValues : initialAddNewPostValues}
            validationSchema={addPostSchema}
            onSubmit={onSubmit}>
            {({
              errors,
              touched,
              isValidating,
              setFieldValue,
              values,
              handleChange,
              handleSubmit,
            }) => (
              <Form
                style={{
                  backgroundColor: "#fff",
                  padding: "5vh",
                  alignSelf: "center",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}>
                <FormInput
                  title='Title'
                  name='title'
                  placeholder='Enter Title'
                  type='text'
                  margin
                />

                <FormInput
                  title='Location'
                  name='location'
                  placeholder='Enter Location'
                  type='text'
                  margin
                />

                <FormTextArea
                  title='Description'
                  name='description'
                  placeholder='Enter Description'
                  rows={4}
                />

                <FormInput
                  title='Video Link'
                  name='videoLink'
                  placeholder='Enter Video Link'
                  type='text'
                  margin
                />

                {!props.edit && (
                  <FormUploadFile
                    name='imageLink'
                    setFieldValue={setFieldValue}
                  />
                )}

                <Button variant='primary' type='submit' className='mt-2'>
                  {props.edit ? "Update" : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
}

export default AddNewPost;
