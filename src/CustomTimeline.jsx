// This code is from the React Calendar Timeline's example: https://codesandbox.io/s/q3rkx1478q?file=/CustomTimeline.jsx

// import React, { Component } from "react";
// import moment from "moment";

// import Timeline from "react-calendar-timeline";

// import generateFakeData from "./generate-fake-data";

// var keys = {
//   groupIdKey: "id",
//   groupTitleKey: "title",
//   groupRightTitleKey: "rightTitle",
//   itemIdKey: "id",
//   itemTitleKey: "title",
//   itemDivTitleKey: "title",
//   itemGroupKey: "group",
//   itemTimeStartKey: "start",
//   itemTimeEndKey: "end",
//   groupLabelKey: "title"
// };

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     const { groups, items } = generateFakeData();
//     const defaultTimeStart = moment()
//       .startOf("day")
//       .toDate();
//     const defaultTimeEnd = moment()
//       .startOf("day")
//       .add(1, "day")
//       .toDate();

//     this.state = {
//       groups,
//       items,
//       defaultTimeStart,
//       defaultTimeEnd
//     };
//   }

//   handleItemMove = (itemId, dragTime, newGroupOrder) => {
//     const { items, groups } = this.state;

//     const group = groups[newGroupOrder];

//     this.setState({
//       items: items.map(item =>
//         item.id === itemId
//           ? Object.assign({}, item, {
//               start: dragTime,
//               end: dragTime + (item.end - item.start),
//               group: group.id
//             })
//           : item
//       )
//     });

//     console.log("Moved", itemId, dragTime, newGroupOrder);
//   };

//   handleItemResize = (itemId, time, edge) => {
//     const { items } = this.state;

//     this.setState({
//       items: items.map(item =>
//         item.id === itemId
//           ? Object.assign({}, item, {
//               start: edge === "left" ? time : item.start,
//               end: edge === "left" ? item.end : time
//             })
//           : item
//       )
//     });

//     console.log("Resized", itemId, time, edge);
//   };

//   render() {
//     const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

//     return (
//       <Timeline
//         groups={groups}
//         items={items}
//         keys={keys}
//         fullUpdate
//         itemTouchSendsClick={false}
//         stackItems
//         itemHeightRatio={0.75}
//         canMove={true}
//         canResize={"both"}
//         defaultTimeStart={defaultTimeStart}
//         defaultTimeEnd={defaultTimeEnd}
//         onItemMove={this.handleItemMove}
//         onItemResize={this.handleItemResize}
//       />
//     );
//   }
// }
