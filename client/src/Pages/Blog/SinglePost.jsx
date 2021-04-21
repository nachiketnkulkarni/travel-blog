import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loading from "../../Components/Loading";
import { CheckLogin } from "../../Healpers/Functions/Functions";
import Header from "../Header";

function SinglePost(props) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (CheckLogin()) {
      setIsLogin(true);
    }
  }, []);

  const [data, setData] = useState(null);
  useEffect(() => {
    props.data
      ? setData(props.data)
      : (async () => {
          const { responseData } = await axios.get(
            `/post/${props.match.params.id}`
          );
          await setData(responseData.data);
        })();
  }, [props.data, props.match.params.id]);

  const navBarMenus = [
    {
      id: "1",
      link: "/blog",
      title: "Blog",
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

  if (!data) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Header navBarMenus={navBarMenus} />
      <DisplayPost
        title={data.title}
        description={data.description}
        img={data.imgLink}
      />
    </>
  );
}

const DisplayPost = (props) => {
  const { title, description, img } = props;
  return (
    <div>
      <Container>
        <div style={{ backgroundColor: "#fff", padding: "2vh" }}>
          {/* <!-- HEADER --> */}
          <div className='blog-post-img'>
            <img
              alt=''
              style={{ width: "100%" }}
              src={
                img
                  ? img
                  : "http://www.limontasport.com/wp-content/uploads/2016/03/limonta-sport-slider-1-2-1800x720.jpg"
              }
            />
          </div>

          {/* <!-- INFO --> */}
          <div className='blog-post-title'>
            <div className='xs-12'>
              <h4 style={{ lineHeight: "25px" }}> {title}</h4>
            </div>
          </div>

          <div className='xs-9 text'>
            <p>{description}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SinglePost;
