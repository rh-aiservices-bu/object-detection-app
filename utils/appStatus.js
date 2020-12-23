const { KAFKA_BROKER_LIST } = require("../utils/constants");

function appStatus(fastify) {
  let kafka = "disconnected";
  if (KAFKA_BROKER_LIST && fastify.kafka) {
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
