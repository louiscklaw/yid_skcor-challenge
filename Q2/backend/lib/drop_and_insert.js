/**
 * Drops an event at the specified index and inserts a new event at the end
 * @param {Array} events - The array of events
 * @param {number} drop_idx - The index of the event to drop
 * @param {Object} new_event - The new event to insert
 */
const drop_and_insert = (events, drop_idx, new_event) => {
  events.splice(drop_idx, 1);
  events.push(new_event);
};

module.exports = drop_and_insert;
