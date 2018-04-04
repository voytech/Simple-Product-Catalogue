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

  isActive = (tab:string) => {
      return window.location.hash.indexOf(tab) != -1;
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
           <NavItem active={this.isActive('dashboard')} eventKey={1} href="#/dashboard">
             Dashboard
           </NavItem>
           <NavItem active={this.isActive('dictionaries')} eventKey={1} href="#/dictionaries">
             Dictionaries
           </NavItem>
           <NavItem active={this.isActive('categories')} eventKey={1} href="#/categories">
             Categories
           </NavItem>
           <NavItem active={this.isActive('products')} eventKey={2} href="#/products">
             Products
           </NavItem>
           <NavItem active={this.isActive('pricelists')} eventKey={2} href="#/pricelists">
             Price Lists
           </NavItem>
           <NavItem active={this.isActive('promotions')} eventKey={2} href="#/promotions">
             Promotions
           </NavItem>
           <NavItem active={this.isActive('inventory')} eventKey={2} href="#/inventory">
             Inventory
           </NavItem>
           <NavItem active={this.isActive('orders')} eventKey={2} href="#/orders">
             Orders
           </NavItem>
           <NavItem active={this.isActive('rating')} eventKey={2} href="#/rating">
             Product Ratings
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
