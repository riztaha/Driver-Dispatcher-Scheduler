import React from "react";
import AvailableTimes from "react-available-times";

import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import CustomTimeline from "./CustomTimeline";

function Calendar() {
  //   const groups = [
  //     { id: 1, title: "Michael Scott" },
  //     { id: 2, title: "Jim Halpert" },
  //     { id: 3, title: "Dwight Schrute" },
  //   ];

  //   const items = [
  //     {
  //       id: 1,
  //       group: 1,
  //       title: "Pickup",
  //       start_time: moment(),
  //       end_time: moment().add(1, "hour"),
  //     },
  //     {
  //       id: 2,
  //       group: 2,
  //       title: "Other",
  //       start_time: moment().add(-1.5, "hour"),
  //       end_time: moment().add(0.5, "hour"),
  //     },
  //     {
  //       id: 3,
  //       group: 1,
  //       title: "Dropoff",
  //       start_time: moment().add(2, "hour"),
  //       end_time: moment().add(3, "hour"),
  //     },
  //   ];
  //   return (
  //     <div>
  //       {/* <CustomTimeline /> */}
  //       <Timeline
  //         groups={groups}
  //         items={items}
  //         defaultTimeStart={moment().add(-12, "hour")}
  //         defaultTimeEnd={moment().add(12, "hour")}
  //       />
  //     </div>
  return (
    <div>
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
            foregroundColor: "#ff00ff",
            backgroundColor: "#f3f3f3",
          },
          {
            id: "other",
            title: "Other",
            foregroundColor: "#ff00ff",
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

export default Calendar;
