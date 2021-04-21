import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function TopSection() {
  return (
    <>
      <Navbar bg='light' variant='light' sticky='top' expand='md'>
        <Container>
          <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
          <Nav className='mr-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopSection;
