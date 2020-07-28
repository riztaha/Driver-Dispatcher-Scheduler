import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Choose a Driver" id="basic-nav-dropdown">
              <NavDropdown.Item href="#calendar/1">
                Michael Scott
              </NavDropdown.Item>
              <NavDropdown.Item href="#calendar/2">
                Dwight Schrute
              </NavDropdown.Item>
              <NavDropdown.Item href="#calendar/3">
                Jim Halpert
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
