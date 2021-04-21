import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CardComponent from "../../Components/CardComponent";
import Loading from "../../Components/Loading";

function BlogPage(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/post");
      setData(data.data);
    })();
  }, []);

  if (!data) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div>
      <Container>
        <h1>Travellers Blog</h1>
        {data &&
          data.map((blog) => {
            return <CardComponent blog={blog} key={blog._id} Blog />;
          })}
      </Container>
    </div>
  );
}

export default BlogPage;
