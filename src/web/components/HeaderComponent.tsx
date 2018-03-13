import * as  React from 'react';
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
      <Navbar inverse collapseOnSelect>
       <Navbar.Header>
         <Navbar.Brand>
           <a href="#brand">{this.props.title}</a>
         </Navbar.Brand>
         <Navbar.Toggle />
       </Navbar.Header>
       <Navbar.Collapse>
         <Nav>
           <NavItem eventKey={1} href="#">
             Info
           </NavItem>
           <NavItem eventKey={2} href="#">
             Products
           </NavItem>
           <NavItem eventKey={2} href="#">
             Price Lists
           </NavItem>
           <NavItem eventKey={2} href="#">
             Promotions
           </NavItem>
           <NavItem eventKey={2} href="#">
             Dicounts
           </NavItem>
         </Nav>
         <Nav pullRight>
           <NavDropdown eventKey={3} title="Profile" id="basic-nav-dropdown">
             <MenuItem eventKey={3.1}>Login</MenuItem>
             <MenuItem eventKey={3.2}>Details</MenuItem>
             <MenuItem eventKey={3.3}>Settings</MenuItem>
             <MenuItem divider />
             <MenuItem eventKey={3.3}>Logout</MenuItem>
           </NavDropdown>
         </Nav>
       </Navbar.Collapse>
      </Navbar>
      </header>
    );
  }
}
