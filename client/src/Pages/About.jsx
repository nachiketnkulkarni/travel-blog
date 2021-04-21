import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import image from "../Healpers/images/01.jpg";

function About(props) {
  return (
    <div id='about' className='aboutSection sectionHeight'>
      <Container>
        <div className='sectionHeading'>
          <h3 className='sectionHeader'>About</h3>
        </div>
        <div className='sectionData'>
          <Row>
            <Col md={3}>
              <img src={image} alt='' className='img-fluid m-2 aboutImage' />
            </Col>
            <Col md={9}>
              <p>
                Hi, I'm Nachiket, and I got my first taste for traveling when I
                was 20 years old. I created this blog so that people like me can
                help the other travelers to find new and beautiful destinations.
                The blog shows diiferent colours of nature and adventures on the
                way to the destination....
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default About;
