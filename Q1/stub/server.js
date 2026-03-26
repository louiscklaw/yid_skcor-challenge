#!/usr/bin/env node
const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  setTimeout(() => {
    res.send([
      { id: 1, name: "a", email: "world" },
      { id: 2, name: "A", email: "world" },
      { id: 3, name: "b", email: "world" },
      { id: 4, name: "c1", email: "world" },
      { id: 5, name: "C2", email: "world" },
    ]);
  }, 5000);
});

app.put("/users/1", (req, res) => {
  setTimeout(() => {
    res.send([
      { id: 1, name: "a", email: "world" },
      { id: 2, name: "A", email: "world" },
      { id: 3, name: "b", email: "world" },
      { id: 4, name: "c1", email: "world" },
      { id: 5, name: "C2", email: "world" },
    ]);
  }, 1000);
});

const server = http.createServer(app); // Create HTTP server

server.listen(3000, () => console.log("Server running on 3000"));
