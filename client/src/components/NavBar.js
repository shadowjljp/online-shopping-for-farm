import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


const NavBar = (props) => {
  return (
    <div>
      <Navbar className="navBar" light expand="md">
        <NavbarBrand href="/">VegeFruit Farms</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/products">Our Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Log In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">Sign Up</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/shopping-cart">Shopping Cart</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;