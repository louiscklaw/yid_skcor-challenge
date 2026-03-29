const { MSG_PRIO_NORMAL } = require("../config");

/**
 * Finds the index of the first normal-priority event in the events array
 * REQ_003: A maximum of 50 events are kept —
 *    - If no low-priority events exist, drop the oldest normal.
 * @param {Array} events - The array of events to search
 * @returns {number} The index of the first normal-priority event, or -1 if not found
 */
function drop_by_first_normal_occurrence(events) {
  let found_idx = -1;

  for (let i = 0; i < events.length; i++) {
    if (events[i].msgPrio == MSG_PRIO_NORMAL) {
      found_idx = i;
      break;
    }
  }

  return found_idx;
}

module.exports = drop_by_first_normal_occurrence;
