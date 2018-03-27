import * as  React from 'react';
import { Link } from 'react-router-dom';
import { logoutAction } from '../actions/user/LogoutAction';

import { Container,
         Row,
         Col,
         Nav,
         Navbar,
         NavLink,
         NavItem,
         NavbarBrand,
         Collapse,
         NavDropdown,
         MenuItem
      } from 'react-bootstrap';

export interface IHeaderComponentProperties {
  title:string;
}

export interface IHeaderComponentState {

}

export class HeaderComponent extends React.Component<IHeaderComponentProperties,IHeaderComponentState> {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <header className="navbar">
      <Navbar fluid inverse collapseOnSelect>
       <Navbar.Header>
         <Navbar.Brand>
           <a href="#brand">{this.props.title}</a>
         </Navbar.Brand>
         <Navbar.Toggle />
       </Navbar.Header>
       <Navbar.Collapse>
         <Nav>
           <NavItem eventKey={1} href="#">
             Dictionaries
           </NavItem>
           <NavItem active eventKey={2} href="#/products">
             Products
           </NavItem>
           <NavItem eventKey={2} href="#/pricelists">
             Price Lists
           </NavItem>
           <NavItem eventKey={2} href="#/promotions">
             Promotions
           </NavItem>
           <NavItem eventKey={2} href="#/discounts">
             Dicounts
           </NavItem>
         </Nav>
         <Nav pullRight>
           <NavDropdown eventKey={3} title="Profile" id="basic-nav-dropdown">
             <MenuItem href="#/user/login" eventKey={3.1}>Login</MenuItem>
             <MenuItem eventKey={3.2}>Details</MenuItem>
             <MenuItem eventKey={3.3}>Settings</MenuItem>
             <MenuItem divider />
             <MenuItem href="#/user/login" onClick={logoutAction} eventKey={3.3}>Logout</MenuItem>
           </NavDropdown>
         </Nav>
       </Navbar.Collapse>
      </Navbar>
      </header>
    );
  }
}
