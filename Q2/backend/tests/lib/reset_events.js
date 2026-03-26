const reset_events = async () => {
  const response = await fetch("http://localhost:3000/reset_events");
};
exports.reset_events = reset_events;
