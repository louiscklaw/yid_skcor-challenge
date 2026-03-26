const assert = require("node:assert/strict");

const testPostData = async (priority, msg, ret_status = 200) => {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      msgType: "test",
      msgBody: msg,
      msgPrio: priority,
    }),
  });

  // const result = await response.json();

  assert.equal(response.status, ret_status);

  console.log("test done");
};

exports.incomingPostData = testPostData;
