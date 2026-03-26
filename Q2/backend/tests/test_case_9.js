// REQ_003: A maximum of 50 events are kept —
//    - If no low-priority events exist, drop the oldest normal.
//
// let initial_msg_array = [
//   ["normal", "msg1"],  <-- expected: drop this one
//   ["normal", "msg2"],
//   ["normal", "msg3"],
//   ...
//   ["normal", "msg49"],
//   ["normal", "msg50"],
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
    .map((_, i) => ["normal", "msg" + (i + 1)]);

  for (p in t1) {
    await postData(t1[p][0], t1[p][1]);
  }

  await incomingPostData("high", "test message");

  let test_result = await getEvents();

  // for ex:
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
