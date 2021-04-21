import * as yup from "yup";

export let signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter correct email address.")
    .required("Enter email address."),
  password: yup
    .string()
    // .min(8, "Password needs to be 8 charachters long.")
    .required("Enter password."),
});

export const signUpSchema = yup.object().shape({
  userName: yup
    .string()
    .required("User name is Required.")
    .min(1, "First Name is Too Short."),

  email: yup.string().email().required("Email is Required."),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
  confirmPassword: yup
    .string()
    .required("Please confirm the password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
});

export const addPostSchema = yup.object().shape({
  title: yup
    .string()
    .required("Please enter title")
    .min(4, "Minimum title length is four characters"),
  location: yup
    .string()
    .required("Please enter location.")
    .min(2, "Location needs to be longer than 2 characters"),
  description: yup
    .string()
    .required("Please add description for your post.")
    .min(40, "Description needs to be longer than 40 characters"),
});
