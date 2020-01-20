import React from 'react';
import { Navbar, NavbarBrand, Nav, NavLink } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { NavLink as RouterNavLink } from 'react-router-dom';
import Routes from './routes';
import MyProvider from "./components/MyProvider"
import './App.css'

function App() {
  return (
    <MyProvider>
      <Navbar>
        <NavbarBrand>
          <h4>Walk This Way</h4>
        </NavbarBrand>
        <Nav>
          <NavLink>
            <RouterNavLink exact to="/" className="nav-link">Metrics live</RouterNavLink>
          </NavLink>
          <NavLink>
            <RouterNavLink exact to="/config" className="nav-link">Configuration</RouterNavLink>
          </NavLink>
        </Nav>
      </Navbar>
      <Routes />
    </MyProvider>
  );

}

export default App;
