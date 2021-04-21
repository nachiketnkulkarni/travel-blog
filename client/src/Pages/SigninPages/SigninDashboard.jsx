import React, { useEffect } from "react";

import { CheckLogin } from "../../Healpers/Functions/Functions";
import { SigninNavBarMenus } from "../../Healpers/NavBarMenu";
import Header from "../Header";
import SigninHome from "./SigninHome";

function SigninDashboard(props) {
  useEffect(() => {
    if (!CheckLogin()) {
      props.history.push("/");
    }
  }, [props.history]);

  return (
    <>
      <Header navBarMenus={SigninNavBarMenus} type='SigninHome' />
      <SigninHome />
    </>
  );
}

export default SigninDashboard;
