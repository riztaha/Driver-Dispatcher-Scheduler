export default function checkDuplicate(id, requestedTime, data) {
  for (const previousBooking of data) {
    // console.log(previousBooking);
    if (
      parseInt(previousBooking.group) === id &&
      requestedTime >= previousBooking.start &&
      requestedTime <= previousBooking.end
    ) {
      return parseInt(previousBooking.id);
    }
  }
}
