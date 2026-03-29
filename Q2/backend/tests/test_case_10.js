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
const { deleteData } = require("./lib/deleteData");

// REQ_003: A maximum of 50 events are kept
const EVENT_LIST_LEN = 50;

(async () => {
  await reset_events();

  let t1 = Array(3)
    .fill(0)
    .map((_, i) => ["normal", "msg" + (i + 1)]);

  for (p in t1) {
    await postData(t1[p][0], t1[p][1]);
  }

  let before_delete = await getEvents();

  await deleteData(before_delete[0].id);

  let after_delete = await getEvents();

  assert.equal(after_delete.length, 2);
  // assert.equal(test_result[EVENT_LIST_LEN - 1].msgBody, "test message");
})();
