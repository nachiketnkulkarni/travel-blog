import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { initialSignUpValues } from "../Healpers/FormInitialValues";
import { signUpSchema } from "../Healpers/FormSchemas";

function SignUp(props) {
  const [errorPresent, setErrorPresent] = useState(null);
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const register = async (val) => {
    try {
      const { data } = await axios.post("/api/auth/register", val, config);
      if (!data.success) {
        setErrorPresent(data.error);
      }
      await localStorage.setItem("authToken", data.token);
      await props.history.push("/home");
    } catch (error) {
      setErrorPresent(error.response.data.error);
    }
  };

  return (
    <Formik
      initialValues={initialSignUpValues}
      validationSchema={signUpSchema}
      onSubmit={(val) => {
        console.log(val);
        register(val);
      }}>
      {({ errors, touched }) => (
        <Form id='login-form' className='form'>
          {errorPresent && (
            <span className='error-message'>{errorPresent}</span>
          )}

          <div style={{ width: "50%", margin: "auto" }}>
            <div className='form-group'>
              <Field
                name='userName'
                type='text'
                className='form-control'
                placeholder='Enter user name.'
              />
              {errors.userName && touched.userName ? (
                <div className='error-text'>{errors.userName}</div>
              ) : null}
            </div>

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
              <Field
                name='confirmPassword'
                type='password'
                className='form-control'
                placeholder='Confirm password.'
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className='error-text'>{errors.confirmPassword}</div>
              ) : null}
            </div>

            <div className='form-group'>
              <br />
              <input
                type='submit'
                name='submit'
                className='btn btn-info btn-md'
                value='Register'
                style={{ width: "30%", textAlign: "center", padding: "5px" }}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
