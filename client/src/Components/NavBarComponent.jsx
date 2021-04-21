import React from "react";
import { Nav } from "react-bootstrap";

function NavBarComponent(props) {
  const { menu } = props;
  return (
    <>
      <Nav.Link
        href={menu.link && menu.link}
        className='menuText'
        onClick={menu.func && menu.func}>
        {menu.title}
      </Nav.Link>
    </>
  );
}

export default NavBarComponent;
