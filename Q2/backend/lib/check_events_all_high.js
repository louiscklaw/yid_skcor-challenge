const { MSG_PRIO_HIGH } = require("../config");

/**
 * Checks if all events in the array are high-priority
 * REQ_003: A maximum of 50 events are kept —
 *    - High-priority events are never dropped — if the buffer is full of only high-priority events, reject the new event with a 429
 * @param {Array} events - The array of events to check
 * @returns {boolean} True if all events are high-priority, false otherwise
 */
function check_events_all_high(events) {
  let all_high = true;

  for (let i = 0; i < events.length; i++) {
    if (events[i].msgPrio != MSG_PRIO_HIGH) {
      all_high = false;
    }
  }

  return all_high;
}

module.exports = check_events_all_high;
