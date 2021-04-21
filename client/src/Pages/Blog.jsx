import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { CheckLogin } from "../Healpers/Functions/Functions";
import BlogPage from "./Blog/BlogPage";
import Header from "./Header";

function Blog(props) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (CheckLogin()) {
      setIsLogin(true);
    }
  }, []);

  if (!isLogin) {
    <Redirect to='/' />;
  }

  const navBarMenus = [
    {
      id: "1",
      link: "/",
      title: "Home",
    },
  ];

  if (!isLogin) {
    navBarMenus.push({
      id: "2",
      link: "/signin",
      title: "SignIn",
    });
  } else {
    navBarMenus.push({
      id: "2",
      link: "/home",
      title: "Dashboard",
    });
  }

  return (
    <>
      <Header navBarMenus={navBarMenus} type='Blog' />
      <BlogPage />
    </>
  );
}

export default Blog;
