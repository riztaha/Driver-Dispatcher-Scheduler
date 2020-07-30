import React, { useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
import EventBookingForm from "./Form";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { CSVLink } from "react-csv";
import Background from "./background.jpg";

let groups = [
  { id: "1", title: "Michael Scott", bgColor: "#f9b87a", tasks: [] },
  { id: "2", title: "Dwight Schrute", bgColor: "#f7d788", tasks: [] },
  { id: "3", title: "Jim Halpert", bgColor: "#f7f38f", tasks: [] },
];

// this allows to then combine and display all the tasks as items.
// let allTasks = [..., groups[0].tasks, groups[1].tasks, groups[2].tasks]]

// Test Events
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

let csvData = [];

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
  let [item, setItem] = useState(items);
  // setGroup never updates because it is static, only 3 drivers for this app. Drivers do not need to be added/edited
  let [group, setGroup] = useState(groups);
  const setItemsWithCSV = (data) => {
    csvData = [
      ["Driver", "Type", "Location", "Description", "Start Time", "End Time"],
    ];

    data.map((item) => {
      let driverName = groups[parseInt(item.group) - 1].title;
      let type =
        item.bgColor === "#f17373"
          ? "Pickup"
          : item.bgColor === "#72ff72"
          ? "Dropoff"
          : "Other";
      let startTime = moment(item.start, "x").format("DD MMM YYYY hh:mm a");
      let endTime = moment(item.end, "x").format("DD MMM YYYY hh:mm a");

      csvData.push([
        driverName,
        type,
        // item.title is location, item.tip is description
        item.title,
        item.tip,
        startTime,
        endTime,
      ]);
    });
    setItem(data);
  };
  return (
    <div className="App">
      <section className="sectionStyle" style={sectionStyle}></section>
      <EventBookingForm setItem={setItemsWithCSV} items={item} />
      <div className="bg-white">
        <Calendar setItems={setItemsWithCSV} items={item} groups={group} />
      </div>
      <div>
        Directions:
        <br></br>
        Navigate Calendar: Scroll left/right, Zoom in/out, or Click Date.
        <br></br>
        Edit Event Duration/Time/Driver: Click on Event and Drag as desired.
        <br></br>
        Delete Event: Right-Click on Event.
      </div>
      <div className="row m-5 d-block">
        <b>
          <CSVLink
            filename={"Driver-Schedule.csv"}
            data={csvData}
            className="btn btn-primary"
            target="_blank"
          >
            Download Schedule as CSV
          </CSVLink>
        </b>
      </div>
    </div>
  );
}

export default App;
