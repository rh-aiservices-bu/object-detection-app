const WebSocket = require("ws");

setup = (fastify) => {
  setInterval(function () {
    fastify.websocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(JSON.stringify({ type: "heartbeat" }));
        } catch (error) {
          fastify.log.error(
            `Failed to broadcast message to client.  Error: ${error.message}`
          );
        }
      }
    });
  }, 3000);
};

module.exports = setup;
