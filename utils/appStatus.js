const { KAFKA_BOOTSTRAP_SERVER } = require("../utils/constants");

function appStatus(fastify) {
  let kafka = "disconnected";
  if (KAFKA_BOOTSTRAP_SERVER && fastify.kafka) {
    kafka = {};
    kafka.producer = fastify.kafka.producer ? "connected" : "disconnected";
    kafka.consumer = fastify.kafka.consumer ? "connected" : "disconnected";
  }

  return {
    status: "ok",
    kafka,
  };
}

module.exports = appStatus;
