const postData = async (priority, msg) => {
  try {
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

    const result = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.postData = postData;
