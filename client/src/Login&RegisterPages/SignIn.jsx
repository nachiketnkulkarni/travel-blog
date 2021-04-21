import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { initialSignInValues } from "../Healpers/FormInitialValues";
import { signInSchema } from "../Healpers/FormSchemas";

const SignIn = ({ history }) => {
  const [errorPresent, setErrorPresent] = useState(null);

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const login = async (val) => {
    try {
      const { data } = await axios.post("/api/auth/login", val, config);
      if (!data.success) {
        setErrorPresent(data.error);
      }

      // console.log(data.token);

      //   // const token = EncryptString(data.token, "encrypt");

      //   // console.log("token enc:--", token);
      //   // await localStorage.setItem("authTokenEnc", token);
      localStorage.setItem("authToken", data.token);
      history.push("/home");
      //   return <Redirect to='/home' />;
    } catch (error) {
      console.log(error.message);
      setErrorPresent(error.response.data.error);
    }
  };

  return (
    <Formik
      initialValues={initialSignInValues}
      validationSchema={signInSchema}
      onSubmit={(val) => {
        login(val);
      }}>
      {({ errors, touched }) => (
        <Form id='login-form' className='form'>
          {errorPresent && (
            <span className='error-message'>{errorPresent}</span>
          )}

          <div style={{ width: "50%", margin: "auto" }}>
            <div className='form-group'>
              <Field
                name='email'
                className='form-control'
                placeholder='Enter email'
              />
              {errors.email && touched.email ? (
                <div className='error-text'>{errors.email}</div>
              ) : null}
            </div>
            <div className='form-group'>
              <Field
                name='password'
                type='password'
                className='form-control'
                placeholder='Enter password.'
              />
              {errors.password && touched.password ? (
                <div className='error-text'>{errors.password}</div>
              ) : null}
            </div>
            <div className='form-group'>
              <br />
              <input
                type='submit'
                name='submit'
                className='btn btn-info btn-md'
                value='Login'
                style={{ width: "30%", textAlign: "center", padding: "5px" }}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
