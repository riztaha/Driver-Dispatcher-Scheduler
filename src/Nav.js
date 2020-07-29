import React, { useState } from "react";
import "./App.css";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import moment from "moment";

function NavHead(props) {
  let [currentDriver, setCurrentDriver] = useState(1);
  let [type, setType] = useState(1);
  let [location, setLocation] = useState(1);
  let [startDate, setStartDate] = useState(1);
  let [endDate, setEndDate] = useState(1);

  return (
    <Navbar bg="light" expand="lg">
      <h1>Create Driver Schedule</h1>
      <Navbar.Collapse id="basic-navbar-nav">
        <form
          style={{ display: "contents" }}
          onSubmit={(e) => {
            e.preventDefault();
            // why do we need to divide/multiply? why not just parse unix time?
            let tempStart = moment(new Date(startDate));
            let tempEnd = moment(new Date(endDate));
            console.log(tempStart, tempEnd);
            //   Error checking, making sure you cannot enter an end date after a start date.
            if (tempStart >= tempEnd) {
              alert("Start date & time should be before the end date time!");
              return;
            }
            if (tempStart.isSame(tempEnd, "day") === false) {
              alert("Time slot must be on same day!");
              return;
            }
            let index = props.items[props.items.length - 1];
            if (index) {
              index = parseInt(props.items[props.items.length - 1].id) + 1;
            } else {
              index = 1;
            }
            let newItem = [
              ...props.items,
              {
                id: index,
                group: currentDriver,
                title: location,
                start: tempStart,

                end: tempEnd,

                bgColor:
                  type === 1 ? "#f17373" : type === 2 ? "#72ff72" : "#9c9cff",
              },
            ];
            console.log(newItem);

            props.setItem(newItem);
          }}
        >
          <div className="form-row">
            <div className="form-group col-md-12">
              <b>Driver</b>
              <select
                className="form-control"
                onChange={(e) => setCurrentDriver(e.currentTarget.value)}
                required={true}
              >
                <option value="1">Michael Scott</option>
                <option value="2">Dwight Schrute</option>
                <option value="3">Jim Halpert</option>
              </select>
            </div>
            <div className="form-group col-md-12">
              <b>Type</b>
              <select
                className="form-control"
                onChange={(e) => setType(e.currentTarget.value)}
                required={true}
              >
                <option value="1">Pickup</option>
                <option value="2">Dropoff</option>
                <option value="3">Other</option>
              </select>
            </div>
            <div className="d-flex">
              <label className="mx-2"> Pickup:</label>
              <div
                style={{ background: "#f17373", width: "50px", height: "20px" }}
              />

              <label className="mx-2">Dropoff:</label>
              <div
                style={{ background: "#72ff72", width: "50px", height: "20px" }}
              />
              <label className="mx-2">Other:</label>
              <div
                style={{ background: "#9c9cff", width: "50px", height: "20px" }}
              />
            </div>
          </div>

          <div className="form-row ml-4">
            <div className="form-group col-md-12">
              <b>Location </b>
              <input
                className="form-control"
                onChange={(e) => setLocation(e.currentTarget.value)}
                required={true}
              />
            </div>
            <div className="form-group col-md-12">
              <b>Start Date & Time </b>
              <input
                className="form-control"
                type="datetime-local"
                onChange={(e) => setStartDate(e.currentTarget.value)}
                required={true}
              />
            </div>
            <div className="form-group col-md-12">
              <b>End Date & Time </b>
              <input
                className="form-control"
                type="datetime-local"
                onChange={(e) => setEndDate(e.currentTarget.value)}
                required={true}
              />
            </div>
          </div>
          <div className="form-row ml-4">
            <div className="form-group col-md-12">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>{" "}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavHead;
