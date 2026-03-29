/**
 * Broadcasts an events update message to all connected WebSocket clients
 * REQ_004: New events are pushed to connected frontends in real-time
 * @param {WebSocket.Server} wss - The WebSocket server instance
 */
function broadcast_events_update(wss) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ events: "updated" }));
    }
  });
}

module.exports = broadcast_events_update;
