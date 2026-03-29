const { MSG_PRIO_LOW } = require("../config");

/**
 * Finds the index of the first low-priority event in the events array
 * REQ_003: A maximum of 50 events are kept —
 *    - when a new event arrives and the buffer is full, the oldest low-priority event is dropped first.
 *    - High-priority events are never dropped — if the buffer is full of only high-priority events, reject the new event with a 429
 * @param {Array} events - The array of events to search
 * @returns {number} The index of the first low-priority event, or -1 if not found
 */
function drop_by_first_low_occurrence(events) {
  let found_idx = -1;

  for (let i = 0; i < events.length; i++) {
    if (events[i].msgPrio == MSG_PRIO_LOW) {
      found_idx = i;
      break;
    }
  }

  return found_idx;
}

module.exports = drop_by_first_low_occurrence;
