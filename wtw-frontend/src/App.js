import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
import Routes from './routes';
import MyProvider from "./components/MyProvider"
import './App.css'

function App() {
  return (
    <MyProvider>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Walk this Way</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link>
              <NavLink exact to="/" className="nav-link">Metrics live</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink exact to="/config" className="nav-link">Configuration</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink exact to="/users" className="nav-link">Patients</NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </MyProvider>
  );

}

export default App;
