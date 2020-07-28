import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AvailableTimes from "react-available-times";

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

      <AvailableTimes
        weekStartsOn="Sunday"
        calendars={[
          {
            id: "pickup",
            title: "Pickup",
            foregroundColor: "#ff00ff",
            backgroundColor: "#f0f0f0",
            selected: true,
          },
          {
            id: "dropoff",
            title: "Dropoff",
            foregroundColor: "#66776",
            backgroundColor: "#f3f3f3",
          },
          {
            id: "other",
            title: "Other",
            foregroundColor: "#666",
            backgroundColor: "#f3f3f3",
          },
        ]}
        onChange={(selections) => {
          selections.forEach(({ start, end }) => {
            console.log("Start:", start, "End:", end);
          });
        }}
        // onEventsRequested={({ calendarId, start, end, callback }) => {
        //   loadMoreEvents(calendarId, start, end).then(callback);
        // }}
        height={600}
        recurring={false}
        availableDays={[
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ]}
        availableHourRange={{ start: 0, end: 24 }}
      />
    </div>
  );
}

export default App;
