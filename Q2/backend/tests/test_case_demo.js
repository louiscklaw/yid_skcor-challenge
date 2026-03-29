//

const { postData } = require("./lib/postData");
const { incomingPostData } = require("./lib/incomingPostData");
const { getEvents } = require("./lib/getEvents");
const { reset_events } = require("./lib/reset_events");

(async () => {
  await reset_events();

  await postData("low", "this is low priority message");
  await postData("normal", "this is low priority message");
  await postData("high", "this is low priority message");

  await postData("low", "這是一個低重要訊息");
  await postData("normal", "這是一個中等重要訊息");
  await postData("high", "這是一個高重要訊息");

  await incomingPostData("high", "test message");
})();
