import React from "react";
import "./App.css";

import {
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="#Driver-1">Driver 1 Schedule</Nav.Link>
          <Nav.Link href="#Driver-2">Driver 2 Schedule</Nav.Link>
          <Nav.Link href="#Driver-3">Driver 3 Schedule</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default App;
