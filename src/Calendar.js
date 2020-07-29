import React, { useState } from "react";
import moment from "moment";

import Timeline from "react-calendar-timeline";

const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
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

  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = props;

    const group = groups[newGroupOrder];

    props.setItems(
      items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id,
            })
          : item
      )
    );

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  const handleItemResize = (itemId, time, edge) => {
    const { items } = props;

    props.setItems(
      items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time,
            })
          : item
      )
    );

    console.log("Resized", itemId, time, edge);
  };

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
          onMouseDown: () => {
            console.log("on item click", item);
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
