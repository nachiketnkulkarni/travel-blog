import axios from "axios";
import { Links } from "./ConstantLinks";
import Aes256Gcm from "aes-256-gcm";
import jwtDecode from "jwt-decode";

export const FetchData = async (url) => {
  const response = await fetch(url);
  const responseData = await response.json();
  return { responseData };
};

// export const SignIn = async (val = {}) => {
//   console.log(val);
//   try {
//     const response = await fetch(LoginLink.login, {
//       method: "POST",
//       // mode: "no-cors",
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(val),
//     });
//     console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// };

// const headers = {
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*",
// };

export const SignIn = async (val) => {
  axios
    .post(Links.login, val)
    .then(function (response) {
      // console.log(response.data.Data);
      return response.data.Data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export function EncryptString(token, type) {
  // Aes256Gcm;
  console.log(Aes256Gcm);

  switch (type) {
    case "encrypt":
      return Aes256Gcm.encrypt(token, process.env.SECRET_STRING);
    case "decrypt":
      return Aes256Gcm.decrypt(token, process.env.SECRET_STRING);
    default:
      return token;
  }
}

export function CheckLogin() {
  if (!localStorage.getItem("authToken")) {
    return false;
  } else {
    const { exp } = jwtDecode(localStorage.getItem("authToken"));
    if (Date.now() >= exp * 1000) {
      console.log(new Date(exp * 1000));
      return false;
    } else {
      return true;
    }
  }
}

export function ConvertDate(date) {
  let newDate = new Date(date);

  return newDate.toDateString();
}
