// REQ_003: A maximum of 50 events are kept —
//    - when a new event arrives and the buffer is full, the oldest low-priority event is dropped first.
//
// let initial_msg_array = [
//   ["low", "msg1"],  <-- drop this one
//   ["low", "msg2"],
//   ["low", "msg3"],
//   ...
//   ["low", "msg49"],
//   ["low", "msg50"],  <-- last element
// ];
//
// let incoming = ["low","test message"]
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
    .map((_, i) => ["low", "msg" + (i + 1)]);

  for (p in t1) {
    await postData(t1[p][0], t1[p][1]);
  }

  await incomingPostData("low", "test message");

  let test_result = await getEvents();

  // For ex:
  // assert.equal(test_result[0].message, "msg2");
  // assert.equal(test_result[1].message, "msg3");
  // assert.equal(test_result[2].message, "msg4");
  // assert.equal(test_result[3].message, "msg5");
  // ...
  // assert.equal(test_result[last].message, "test message");
  for (let i = 0; i < EVENT_LIST_LEN - 1; i++) {
    assert.equal(test_result[i].msgBody, "msg" + (i + 1 + 1));
  }
  assert.equal(test_result[EVENT_LIST_LEN - 1].msgBody, "test message");
})();
