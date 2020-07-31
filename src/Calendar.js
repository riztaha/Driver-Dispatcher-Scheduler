import React, { useState } from "react";
import moment from "moment";
import { items } from "./App.js";

import Timeline from "react-calendar-timeline";

const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};

function Calendar(props) {
  const [defaultTimeStart, setDefaultTimeStart] = useState(
    moment().startOf("day").toDate()
  );
  const [defaultTimeEnd, setDefaultTimeEnd] = useState(
    moment().startOf("day").add(1, "day").toDate()
  );

  //   Handle moving an event, changing it's time or changing the driver it belongs to
  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = props;
    const group = groups[newGroupOrder];

    let bookings = items.map((item) =>
      item.id === itemId
        ? Object.assign({}, item, {
            start: moment(dragTime),
            end: moment(dragTime + (item.end - item.start)),
            group: group.id,
          })
        : item
    );
    props.setItems(bookings);
    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  //   Handling changing the duration of an event.
  const handleItemResize = (itemId, time, edge) => {
    const { items } = props;

    props.setItems(
      items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? moment(time) : moment(item.start),
              end: edge === "left" ? moment(item.end) : moment(time),
            })
          : item
      )
    );

    console.log("Resized", itemId, time, edge);
  };

  const onHandleItemEdit = (itemId, itemTitle, itemTip) => {
    console.log(itemId, itemTitle, itemTip);
    const { items } = props;
    props.setItems(
      items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              title: itemTitle ? itemTitle : item.title,
              tip: itemTip ? itemTip : item.tip,
            })
          : item
      )
    );
  };

  //   Rendering the event
  const itemRenderer = ({
    //   instead of passing item, we will then pass all drivers info
    //   then combine all drivers tasks into one object to display on calendar
    //   this will make it easier to then get csv data for 2, 4, 7, etc days.
    item,
    timelineContext,
    itemContext,
    getItemProps,
    getResizeProps,
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected
      ? itemContext.dragging
        ? "red"
        : "yellow" //selectedBgColor
      : item.bgColor;
    const borderColor = itemContext.selected
      ? itemContext.resizing
        ? "red"
        : "yellow"
      : item.color;

    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            color: item.color,
          },
          onDoubleClick: () => {
            console.log("on double click", item);
            if (
              window.confirm(
                `Would you like to EDIT the Location/Description?
                Event information:
                Location: ${item.title}\n
                Description: ${item.tip},\n
                Time: ${item.start} - ${item.end}`
              )
            );
            {
              // Receive new location/description
              let newLoc = prompt("Location: ", `${item.title}`);
              let newDesc = prompt("Description: ", `${item.tip}`);
              // Now change the data
              console.log(item.id);
              if (
                (newLoc && newLoc.length > 0) ||
                (newDesc && newDesc.length > 0)
              ) {
                onHandleItemEdit(item.id, newLoc, newDesc);

                // if (item.id === itemContext.id) {
                //   console.log("item id matches");
                // This will remove the item
                // props.setItems(props.items.filter((x) => x.id !== item.id));

                itemContext["title"] = newLoc;
                itemContext["tip"] = newDesc;
              } else {
              }

              // }
            }
          },
          //   onContextMenu is right click functionality given from calendar library
          onContextMenu: () => {
            console.log("on Right Click", item);
            //   Window will pop up confirming if you would like to delete the right-clicked timeslot
            // Can clean up time
            // Can add helper function to identify driver name based off item.group which is a number.
            if (
              window.confirm(
                `WARNING: Are you sure you want to DELETE this event?
                Location: ${item.title},\n
                Description: ${item.tip},\n
                Time: ${item.start} - ${item.end}
                `
              )
            ) {
              // resetting all the items, filtering for the id of the item which was right-clicked
              // and removing it from the rest of the array
              props.setItems(props.items.filter((x) => x.id !== item.id));
            } else {
              // Do nothing! Keep the time slot there if window.confirm is false
            }
          },
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

  return (
    <Timeline
      groups={props.groups}
      items={props.items}
      keys={keys}
      fullUpdate
      itemTouchSendsClick={false}
      sidebarContent={<div>Above The Left</div>}
      stackItems={true}
      itemHeightRatio={0.75}
      canMove={true}
      canResize={"both"}
      itemRenderer={itemRenderer}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
      onItemMove={handleItemMove}
      onItemResize={handleItemResize}
      // onItemDoubleClick={onHandleItemEdit}
    />
  );
}

export default Calendar;
