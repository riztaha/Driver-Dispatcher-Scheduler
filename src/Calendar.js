import React, { useState } from "react";
import moment from "moment";

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

    props.setItems(
      items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: moment(dragTime),
              end: moment(dragTime + (item.end - item.start)),
              group: group.id,
            })
          : item
      )
    );

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

  //   Rendering the event
  const itemRenderer = ({
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
    const borderColor = itemContext.resizing ? "red" : item.color;

    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor: backgroundColor,
            color: item.color,
          },
          onDoubleClick: () => {
            console.log("on double click", item);
            alert(`
                Event information:
                Location: ${item.title},
                Description: ${item.tip},
                Time: ${item.start} - ${item.end}`);
          },
          onContextMenu: () => {
            //   Window will pop up confirming if you would like to delete the right-clicked timeslot
            // Can clean up time
            // Can add helper function to identify driver name based off item.group which is a number.
            if (
              window.confirm(
                `Are you sure you want to delete this event?
                Location: ${item.title},
                Description: ${item.tip},
                Time: ${item.start} - ${item.end}
                `
              )
            ) {
              props.setItems(props.items.filter((x) => x.id != item.id));
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
    />
  );
}

export default Calendar;
