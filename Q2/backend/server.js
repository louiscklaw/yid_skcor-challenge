// Backend (Grails or Node.js)
// REQ_001: An endpoint POST /events that accepts an event with fields:
//    type (string),
//    message (string),
//    priority (“low”, “normal”, “high”)
//    timestamp: pseudo for record arrive time
// REQ_002: Events are stored in memory (no database required)
// REQ_003: A maximum of 50 events are kept —
//    - when a new event arrives and the buffer is full, the oldest low-priority event is dropped first.
//    - If no low-priority events exist, drop the oldest normal.
//    - High-priority events are never dropped — if the buffer is full of only high-priority events, reject the new event with a 429
// REQ_004: New events are pushed to connected frontends in real-time (your choice: WebSocket, SSE, or polling)
// REQ_005: An endpoint GET /events returns the current buffer, sorted by timestamp descending

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const { ERR_OVERFOW_SC, ERR_ALL_HIGH_PRIO_MSG_SC, ERR_ALL_HIGH_PRIO_MSG, ERR_ALL_HIGH_PRIO_MSG_EXPLAIN, ERR_MISSING_FIELDS_EXPLAIN } = require("./config");

const drop_and_insert = require("./lib/drop_and_insert");
const drop_by_first_low_occurrence = require("./lib/drop_by_first_low_occurrence");
const drop_by_first_normal_occurrence = require("./lib/drop_by_first_normal_occurrence");
const check_events_all_high = require("./lib/check_events_all_high");
const broadcast_events_update = require("./lib/broadcast_events_update");

// REQ_003: A maximum of 50 events are kept
const EVENT_LIST_LEN = 50;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app); // Create HTTP server
const wss = new WebSocket.Server({ server }); // Bind WebSocket to it

clients = [];

// REQ_002: Events are stored in memory (no database required)
// REQ_003: A maximum of 50 events are kept
let events = [];

// REQ_005: An endpoint GET /events returns the current buffer, sorted by timestamp descending
app.get("/events", (req, res) => {
  var sorted_events = events.sort((a, b) => a.id - b.id);
  res.send(sorted_events);
});

// endpoint for debug and not for production
app.get("/reset_events", (req, res) => {
  events = [];
  res.send({});
});

// REQ_001: An endpoint POST /events that accepts an event with fields:
//    type (string),
//    message (string),
//    priority (“low”, “normal”, “high”)
//    timestamp: pseudo for record arrive time
app.post("/events", (req, res) => {
  const epochTimeInSeconds = Math.floor(Date.now() / 1000);

  try {
    const { msgType, msgBody, msgPrio } = req.body;

    // Basic validation
    if (!msgType || !msgBody || !msgPrio) {
      return res.status(400).json({ error: ERR_MISSING_FIELDS_EXPLAIN });
    }

    const newEvent = {
      id: uuidv4(),
      msgType,
      msgBody,
      msgPrio,
      msgTimestamp: epochTimeInSeconds,
    };

    if (events.length < EVENT_LIST_LEN) {
      // when it is not full
      events.push(newEvent);
    } else {
      if (check_events_all_high(events)) throw new Error(ERR_ALL_HIGH_PRIO_MSG);

      let drop_idx = -1;
      // drop by first low occurrence
      drop_idx = drop_by_first_low_occurrence(events);

      // drop by first normal occurrence
      if (drop_idx == -1) {
        drop_idx = drop_by_first_normal_occurrence(events);
      }

      // all low case
      if (drop_idx == -1) {
        drop_and_insert(events, 0, newEvent);
      } else {
        drop_and_insert(events, drop_idx, newEvent);
      }
    }

    // REQ_004: New events are pushed to connected frontends in real-time (your choice: WebSocket, SSE, or polling)
    broadcast_events_update(wss);

    res.status(200).json({ event: newEvent });
  } catch (error) {
    if (error.message == ERR_ALL_HIGH_PRIO_MSG) {
      res.status(ERR_ALL_HIGH_PRIO_MSG_SC).json({ error: ERR_ALL_HIGH_PRIO_MSG_EXPLAIN });
    } else {
      // TODO: better error handling, need further clarification. `500` ?
      res.status(ERR_OVERFOW_SC);
    }
  }
});

// DELETE endpoint to remove event by id
app.delete("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const eventIndex = events.findIndex((event) => event.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ error: "Event not found" });
  }

  events.splice(eventIndex, 1);

  // REQ_004: New events are pushed to connected frontends in real-time
  broadcast_events_update(wss);

  res.status(200).json({ message: "Event deleted successfully" });
});

// REQ_004: New events are pushed to connected frontends in real-time (your choice: WebSocket, SSE, or polling)
wss.on("connection", (ws) => {
  test_ws = ws;
  ws.on("message", (buf) => {
    msg_s = buf.toString();
    msg_o = JSON.parse(msg_s);
    ws.send(JSON.stringify(msg_o));
  });
});

// TODO: refactor `3000` to environment variable ? docker ?
server.listen(3000, () => console.log("Server running on 3000"));
