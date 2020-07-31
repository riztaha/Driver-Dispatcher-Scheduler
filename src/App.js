import React, { useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
import EventBookingForm from "./EventBookingForm";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import Background from "./background.jpg";

// to_do:
// adding tasks: [] to each group obj
//  this allows to then combine and display all the tasks related to group
// let items = [..., groups[0].tasks, groups[1].tasks, groups[2].tasks]]
// then when rendering, pass groups.tasks instead of items

const sectionStyle = {
  width: "100%",
  height: "400px",
  opacity: "40%",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${Background})`,
  position: "absolute",
};

function App() {
  // Test Events
  let groups = [
    { id: "1", title: "Michael Scott", bgColor: "#f9b87a" },
    { id: "2", title: "Dwight Schrute", bgColor: "#f7d788" },
    { id: "3", title: "Jim Halpert", bgColor: "#f7f38f" },
  ];
  let items = [
    // Test events for Michael
    {
      bgColor: "#f17373",
      start: moment("28 JUL 2020 09:30"),
      end: moment("28 JUL 2020 12:30"),
      group: 1,
      id: "140",
      title: "Test Pickup",
      tip: "This is just a test pickup for Michael",
    },
    {
      bgColor: "#9c9cff",
      start: moment("28 JUL 2020 13:30"),
      end: moment("28 JUL 2020 14:30"),
      group: 1,
      id: "141",
      title: "Break time!",
      tip: "This is just a test break for Michael",
    },
    {
      bgColor: "#72ff72",
      start: moment("28 JUL 2020 15:30"),
      end: moment("28 JUL 2020 19:30"),
      group: 1,
      id: "142",
      title: "Test Dropoff",
      tip: "This is just a test dropoff for Michael",
    },
    // Test events for Dwight
    {
      bgColor: "#f17373",
      start: moment("29 JUL 2020 09:30"),
      end: moment("29 JUL 2020 12:30"),
      group: 2,
      id: "143",
      title: "Test Pickup",
      tip: "This is just a test pickup for Dwight",
    },
    {
      bgColor: "#9c9cff",
      start: moment("29 JUL 2020 13:30"),
      end: moment("29 JUL 2020 14:30"),
      group: 2,
      id: "144",
      title: "Break time!",
      tip: "This is just a test break for Dwight",
    },
    {
      bgColor: "#72ff72",
      start: moment("29 JUL 2020 15:30"),
      end: moment("29 JUL 2020 19:30"),
      group: 2,
      id: "145",
      title: "Test Dropoff",
      tip: "This is just a test dropoff for Dwight",
    },
    // Test events for Jim
    {
      bgColor: "#f17373",
      start: moment("30 JUL 2020 09:30"),
      end: moment("30 JUL 2020 12:30"),
      group: 3,
      id: "146",
      title: "Test Pickup",
      tip: "This is just a test pickup for Jim",
    },
    {
      bgColor: "#9c9cff",
      start: moment("30 JUL 2020 13:30"),
      end: moment("30 JUL 2020 14:30"),
      group: 3,
      id: "147",
      title: "Break time!",
      tip: "This is just a test break for Jim",
    },
    {
      bgColor: "#72ff72",
      start: moment("30 JUL 2020 15:30"),
      end: moment("30 JUL 2020 19:30"),
      group: 3,
      id: "148",
      title: "Test Dropoff",
      tip: "This is just a test dropoff for Jim",
    },
  ];

  let [item, setItem] = useState(items);
  // setGroup never updates because it is static, only 3 drivers for this app. Drivers do not need to be added/edited
  let [group, setGroup] = useState(groups);
  let [dataDriver, setDataDriver] = useState(1);
  let [dataDuration, setDataDuration] = useState(2);

  let allDriversSchedule_CSV = [];
  let oneDriversSchedule_CSV = [];

  const addBooking = (data) => {
    console.log("adding booking");
    setItem(data);
    prepareCSVExportData(data);
    setItemsWithCSV(data);
  };

  const prepareCSVExportData = (data) => {
    allDriversSchedule_CSV = [
      ["Driver", "Type", "Location", "Description", "Start Time", "End Time"],
    ];

    data.map((item) => {
      let driverName = groups[parseInt(item.group) - 1].title;
      // Getting type of event from color
      let type =
        item.bgColor === "#f17373"
          ? "Pickup"
          : item.bgColor === "#72ff72"
          ? "Dropoff"
          : "Other";
      let startTime = moment(item.start, "x").format("DD MMM YYYY hh:mm a");
      let endTime = moment(item.end, "x").format("DD MMM YYYY hh:mm a");

      allDriversSchedule_CSV.push([
        driverName,
        type,
        // item.title is location, item.tip is description
        item.title,
        item.tip,
        startTime,
        endTime,
      ]);
    });
  };

  const setItemsWithCSV = (data) => {
    oneDriversSchedule_CSV = [["Time-Frame", "Pickup", "Drop-off", "Other"]];
    console.table(data);
    let driverBookings = data.filter((booking) => {
      let driver = dataDriver;
      if (booking.group == driver) {
        return true;
      }
    });

    // console.log("driverBookings=====>", driverBookings);
    // console.log("data Duration form value ====>", dataDuration);
    let timeFrames = generateTimeframeBuckets(driverBookings);
    // console.log("time intervals ====>", timeFrames);

    //for each time bucket, check if a booking exists
    // if booking exists, for that time bucket, increment the type of booking

    // Looping through time intervals
    for (let index = 0; index < timeFrames.length - 1; index++) {
      let first = moment(timeFrames[index], "DD/MM/YYYY");
      let second = moment(timeFrames[index + 1], "DD/MM/YYYY");
      if (timeFrames.length === 1) {
        second = moment(timeFrames[0], "DD/MM/YYYY").add(dataDuration, "days");
      }

      // console.log("first interval ===> :>> ", first);
      // console.log("second interval ===> :>> ", second);

      let bookingsForBucket = driverBookings.filter((booking) => {
        if (booking.start >= first && booking.end <= second) {
          return true;
        }
      });
      // console.log("bookings within date ranges", bookingsForBucket);

      let column = getTypesOfBookings(bookingsForBucket);
      // console.log("obj count per date range", column);
      let row = [
        moment(first).format("DD/MM/YYYY") +
          " - " +
          moment(second).format("DD/MM/YYYY"),
        column.pickUp,
        column.dropOff,
        column.other,
      ];
      oneDriversSchedule_CSV.push(row);
    }
  };

  const getTypesOfBookings = (data) => {
    // types can be found by their color in the calendar.
    // item.bgColor === "#f17373"
    //   ? "Pickup"
    //   : item.bgColor === "#72ff72"
    //   ? "Dropoff"
    //   : "Other";

    const obj = {
      pickUp: 0,
      dropOff: 0,
      other: 0,
    };
    data.forEach((booking) => {
      if (booking.bgColor === "#f17373") {
        obj.pickUp += 1;
      } else if (booking.bgColor === "#72ff72") {
        obj.dropOff += 1;
      } else {
        obj.other += 1;
      }
    });
    return obj;
  };

  const generateTimeframeBuckets = (driverBookings) => {
    let startMoments = driverBookings.map((d) => moment(d.start));
    // console.log("startMoments :>> ", startMoments);
    let endMoments = driverBookings.map((d) => moment(d.end));
    // console.log("endMoments :>> ", endMoments);

    let earliestStartDate = moment.min(startMoments);
    // console.log("earliestStartDate :>> ", earliestStartDate);
    let latestEndDate = moment.max(endMoments);
    // console.log("latestEndDate :>> ", latestEndDate);
    // let timeFrames = [earliestStartDate];
    let timeFrames = [];

    // timeFrames.push(earliestStartDate);

    let start = new Date(earliestStartDate);
    let end = new Date(latestEndDate);
    while (start < end) {
      timeFrames.push(moment(start).format("DD-MM-YYYY"));
      let newDate = start.setDate(start.getDate() + parseInt(dataDuration));
      start = new Date(newDate);
    }
    timeFrames.push(moment(start).format("DD-MM-YYYY"));

    return timeFrames;
  };

  // Rubber Duck -
  // Need a drop down for 2,4,7, etc days. User will choose a day, On change of the drop down,
  // start the function again, create a function (in App.js) that will take allDriversSchedule_CSV, and play around with it to create oneDriversSchedule_CSV
  // Change row and heading in oneDriversSchedule_CSV according to day and driverName
  // using find, filter etc, count the rows in data and count how many times a type
  // occurs for the driver (driverName) selected during the duration.

  prepareCSVExportData(item);
  setItemsWithCSV(item);

  const driverIDToName = (dataDriver) => {
    return groups[dataDriver - 1].title;
  };

  return (
    <div className="App">
      <section className="sectionStyle" style={sectionStyle}></section>
      <EventBookingForm setItem={addBooking} items={item} />
      <div className="bg-white">
        <Calendar setItems={addBooking} items={item} groups={group} />
      </div>
      <div>
        Directions:
        <br></br>
        Navigate Calendar: Scroll left/right, Zoom in/out, or Click Date.
        <br></br>
        Edit Event Duration/Time/Driver: Click on Event and Drag as desired.
        <br></br>
        Edit Event Title/Description: Double-Click on Event, make changes as
        desired. Unhighlight Event.
        <br></br>
        Delete Event: Right-Click on Event.
      </div>
      <div className="row m-5 d-block">
        <b>
          <CSVLink
            filename={"Drivers-Schedule-Raw.csv"}
            data={allDriversSchedule_CSV}
            className="btn btn-primary"
            target="_blank"
          >
            Download Schedule as CSV
          </CSVLink>
        </b>
      </div>
      <div className="row m-5 d-block">
        <div className="col-md-12 d-flex justify-content-center">
          <div className="form-group col-md-4">
            <b>Driver*</b>
            <select
              className="form-control"
              onChange={(e) => setDataDriver(e.currentTarget.value)}
              required={true}
            >
              <option value="1">Michael Scott</option>
              <option value="2">Dwight Schrute</option>
              <option value="3">Jim Halpert</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <b>Duration*</b>
            <select
              className="form-control"
              onChange={(e) => setDataDuration(e.currentTarget.value)}
              required={true}
            >
              <option value="2">2 days</option>
              <option value="4">4 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="28">28 days</option>
            </select>
          </div>
        </div>
        <b>
          <CSVLink
            // filename={"Driver-Schedule.csv"}
            filename={`${driverIDToName(
              dataDriver
            )}_Report_${dataDuration}_days.csv`}
            data={oneDriversSchedule_CSV}
            className="btn btn-primary"
            target="_blank"
          >
            Download Data as CSV
          </CSVLink>
        </b>
      </div>
    </div>
  );
}

export default App;
