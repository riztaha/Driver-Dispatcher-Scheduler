import React from "react";
import AvailableTimes from "react-available-times";

function Calendar() {
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

export default Calendar;
