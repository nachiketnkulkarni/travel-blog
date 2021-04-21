import React from "react";
import { CardDeck, Container, Row } from "react-bootstrap";
import CardComponent from "../Components/CardComponent";
import { Link } from "react-router-dom";

function BlogSection(props) {
  const { data } = props;
  return (
    <div id='blog' className='sectionHeight oddSection'>
      <Container>
        <div className='sectionHeading'>
          <h3 className='sectionHeader'>Posts</h3>
        </div>
        <div className='sectionData'>
          <Row>
            <Link to='/blog' className='ml-auto'>
              <span className='see-all' style={{ color: "#fff" }}>
                View all
              </span>
            </Link>
          </Row>
          <Row>
            <CardDeck>
              {data &&
                data
                  .slice(data.length - 3, data.length)
                  .reverse()
                  .map((blog) => {
                    //console.log(blog);
                    return <CardComponent key={blog._id} blog={blog} Home />;
                  })}
            </CardDeck>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default BlogSection;
