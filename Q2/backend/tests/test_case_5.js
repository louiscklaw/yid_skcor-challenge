// REQ_003: A maximum of 50 events are kept —
//    - when a new event arrives and the buffer is full, the oldest low-priority event is dropped first.
//
// let initial_msg_array = [
//   ["high", "msg1"],
//   ["low", "msg2"],       <-- expected: drop this one
//   ["high", "msg3"],
//   ...
//   ["low", "msg49"],
//   ["high", "msg50"],
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
    .map((_, i) => (i % 2 == 0 ? ["high", "msg" + (i + 1)] : ["low", "msg" + (i + 1)]));

  for (p in t1) {
    await postData(t1[p][0], t1[p][1]);
  }

  await incomingPostData("low", "test message");

  let test_result = await getEvents();

  // for ex:
  // assert.equal(test_result[0].message, "msg1");
  // NOTE: msg2 deleted
  // assert.equal(test_result[1].message, "msg3");
  // assert.equal(test_result[2].message, "msg4");
  // assert.equal(test_result[3].message, "msg5");
  // ...
  // assert.equal(test_result[last].message, "test message");

  assert.equal(test_result[0].msgBody, "msg1");

  // NOTE: msg2 deleted
  assert.equal(test_result[1].msgBody, "msg3");
  for (let i = 2; i < EVENT_LIST_LEN - 1 - 1; i++) {
    assert.equal(test_result[i].msgBody, "msg" + (i + 1 + 1));
  }
  assert.equal(test_result[EVENT_LIST_LEN - 1].msgBody, "test message");
})();
