import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import NavBarComponent from "../Components/NavBarComponent";

function Header(props) {
  const { navBarMenus, type } = props;
  let classType = "";

  switch (type) {
    case "Home":
      classType = "page-holder bg-cover home-body";
      break;
    case "SigninHome":
      classType = "page-holder plain-body";
      break;
    case "Blog":
      classType = "page-holder bg-cover blog-body";
      break;
    default:
      classType = "page-holder plain-body";
      break;
  }

  return (
    <div className={classType}>
      <Navbar collapseOnSelect expand='lg' fixed='top'>
        <Navbar.Brand href='/' className='menuText'>
          Travellers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {navBarMenus.map((menu, index) => {
              return <NavBarComponent menu={menu} key={menu.id} />;
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
