const getEvents = async () => {
  const response = await fetch("http://localhost:3000/events");
  let res_json = await response.json();
  return res_json;
};
exports.getEvents = getEvents;
