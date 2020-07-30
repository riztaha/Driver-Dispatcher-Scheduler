import React, { useState } from "react";
import "./App.css";
import Calendar from "./Calendar";
import Nav from "./Nav";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { CSVLink } from "react-csv";

let groups = [
  { id: "1", title: "Michael", rightTitle: "Scott", bgColor: "#f9b87a" },
  { id: "2", title: "Dwight", rightTitle: "Schrute", bgColor: "#f7d788" },
  { id: "3", title: "Jim", rightTitle: "Halpert", bgColor: "#f7f38f" },
];

let items = [
  // {
  //   bgColor: "#f17373",
  //   end: 1595948760000,
  //   group: 1,
  //   id: "140",
  //   start: 1595941440000,
  //   title: "jhkj",
  // },
];
let csvData = [];

function App() {
  let [item, setItem] = useState(items);
  let [group, setGroup] = useState(groups);
  const setItemsWithCSV = (data) => {
    csvData = [];
    csvData.push([
      "Driver",
      "Type",
      "Location",
      "Description",
      "Start Time",
      "End Time",
    ]);
    data.map((item) => {
      let driverName = `${groups[parseInt(item.group) - 1].title} ${
        groups[parseInt(item.group) - 1].rightTitle
      }`;
      let type =
        item.bgColor === "#f17373"
          ? "Pickup"
          : item.bgColor === "#72ff72"
          ? "Dropoff"
          : "Other";
      let starttime = moment(item.start, "x").format("DD MMM YYYY hh:mm a");
      let endtime = moment(item.end, "x").format("DD MMM YYYY hh:mm a");

      csvData.push([
        driverName,
        type,
        item.title,
        item.tip,
        starttime,
        endtime,
      ]);
    });
    setItem(data);
  };
  return (
    <div className="App">
      <Nav setItem={setItemsWithCSV} items={item} />
      <Calendar setItems={setItemsWithCSV} items={item} groups={group} />
      <div>
        Directions:
        <br></br>
        Edit event duration/time/driver: click on the event and drag as desired.
        <br></br>
        Delete event: right click on the event.
      </div>
      <div className="row m-5 d-block">
        <b>
          <CSVLink data={csvData}>Download Schedule as CSV</CSVLink>
        </b>
      </div>
    </div>
  );
}

export default App;
