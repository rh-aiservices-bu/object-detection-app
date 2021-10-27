const { KAFKA_BOOTSTRAP_SERVER } = require("../utils/constants");

function appStatus(fastify) {
  let kafka = "disconnected";
  let imagesConnected = fastify?.kafka?.producers?.images;
  let objectsConnected = fastify?.kafka?.consumers?.objects;
  if (KAFKA_BOOTSTRAP_SERVER && imagesConnected && objectsConnected) {
    kafka = "connected";
  }

  return {
    status: "ok",
    kafka,
  };
}

module.exports = appStatus;
