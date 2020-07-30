import React, { useState } from "react";
import "./App.css";
import moment from "moment";
import checkDuplicate from "./HelperFunctions";

function EventBookingForm(props) {
  let [currentDriver, setCurrentDriver] = useState(1);
  let [type, setType] = useState(1);
  let [location, setLocation] = useState(1);
  let [description, setDescription] = useState(1);
  let [startDate, setStartDate] = useState(1);
  let [endDate, setEndDate] = useState(1);

  return (
    <div className="bg-transparent mx-auto text-center">
      <h1 className="text-weight-bold">Create Driver Schedule</h1>
      <form
        className="container-fluid"
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
          // Error checking, making sure event is within a 24 hour period (same day)
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
          // Error checking for duplicate time slot for the driver.
          // If the helper function returns true, it will return the timeslot id of the previous booking.
          if (
            checkDuplicate(parseInt(currentDriver), tempStart, props.items) > 0
          ) {
            alert("This time slot already exists");
            return;
          } else {
            console.log("props ====>", props);
            let newItem = [
              ...props.items,
              // for every new task, add it to the drivers array:
              // something like this
              // groups[currentDriverIndex].tasks.push(newItem);
              {
                id: index,
                group: parseInt(currentDriver),
                title: location,
                tip: description,
                start: tempStart,
                end: tempEnd,

                bgColor:
                  type === 1 ? "#f17373" : type === 2 ? "#72ff72" : "#9c9cff",
              },
            ];
            console.log("new Item", newItem);
            // Error checking, check to make sure there is already no event booked during that period for the driver.
            props.setItem(newItem);
          }
        }}
      >
        <div className="row">
          <div className="col-md-4">
            <div className="form-group col-md-12">
              <b>Driver*</b>
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
              <b>Type*</b>
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
          </div>

          <div className="col-md-4">
            <div className="form-group col-md-12">
              <b>Location*</b>
              <input
                className="form-control"
                onChange={(e) => setLocation(e.currentTarget.value)}
                required={true}
              />
            </div>
            <div className="form-group col-md-12">
              <b>Description</b>
              <input
                className="form-control"
                onChange={(e) => setDescription(e.currentTarget.value)}
                required={false}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group col-md-12">
              <b>Start Date & Time*</b>
              <input
                className="form-control"
                type="datetime-local"
                onChange={(e) => setStartDate(e.currentTarget.value)}
                required={true}
              />
            </div>
            <div className="form-group col-md-12">
              <b>End Date & Time*</b>
              <input
                className="form-control"
                type="datetime-local"
                onChange={(e) => setEndDate(e.currentTarget.value)}
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="row mx-auto">
          <div className="col-md-9">
            <div className="d-flex">
              <label className="mx-2"> Pickup:</label>
              <div
                style={{
                  background: "#f17373",
                  width: "50px",
                  height: "20px",
                }}
              />
              <label className="mx-2">Dropoff:</label>
              <div
                style={{
                  background: "#72ff72",
                  width: "50px",
                  height: "20px",
                }}
              />
              <label className="mx-2">Other:</label>
              <div
                style={{
                  background: "#9c9cff",
                  width: "50px",
                  height: "20px",
                }}
              />
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary btn-block" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>{" "}
    </div>
  );
}

export default EventBookingForm;
