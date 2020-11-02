import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl } from 'react-bootstrap';
import { Button } from 'reactstrap';
import '../../css/Navigation.css';
import {NavLink, Link} from 'react-router-dom';

class PublicNavigation extends React.Component {

  render() {
    
    return (
      
      <Navbar className="sticky-top navColor" expand="lg">
        <Navbar.Brand href="#home">
          <img src={require('../../assets/logo.png')} width="30" height="30" alt=""/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Item><NavLink className="nav-link" exact to={"/"}>Home</NavLink></Nav.Item> */}
           
          </Nav>
          <Form >
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
          
            <Button  className="btn btn-outline-light font-weight-bold" tag={Link} to={"/login"}>Login</Button>

          </Form>
    
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default PublicNavigation;