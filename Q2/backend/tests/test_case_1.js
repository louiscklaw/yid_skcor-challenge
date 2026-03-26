// REQ_003: A maximum of 50 events are kept —
//    - High-priority events are never dropped — if the buffer is full of only high-priority events, reject the new event with a 429
//
// let initial_msg_array = [
//   ["high", "msg1"],
//   ["high", "msg2"],
//   ["high", "msg3"],
//   ...
//   ["high", "msg49"],
//   ["high", "msg50"],  <-- last element, return 429
// ];
//
// let incoming = ["high","test message"]
//

const assert = require("node:assert/strict");
const { postData } = require("./lib/postData");
const { incomingPostData } = require("./lib/incomingPostData");
const { getEvents } = require("./lib/getEvents");
const { reset_events } = require("./lib/reset_events");

// REQ_003: A maximum of 50 events are kept
const EVENT_LIST_LEN = 50;

(async () => {
  await reset_events();

  let t1 = Array(EVENT_LIST_LEN)
    .fill(0)
    .map((_, i) => ["high", "msg" + (i + 1)]);

  for (p in t1) {
    await postData(t1[p][0], t1[p][1]);
  }

  // NOTE: should return 429
  await incomingPostData("low", "test message", 429);

  let test_result = await getEvents();

  // For ex:
  // assert.equal(test_result[0].message, "msg1");
  // assert.equal(test_result[1].message, "msg2");
  // assert.equal(test_result[2].message, "msg3");
  // assert.equal(test_result[3].message, "msg4");
  // ...
  // assert.equal(test_result[49].message, "msg50");
  for (let i = 0; i < EVENT_LIST_LEN; i++) {
    assert.equal(test_result[i].msgBody, "msg" + (i + 1));
  }
})();
