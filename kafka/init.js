const {
  KAFKA_BROKER_LIST,
  KAFKA_TOPIC_IMAGES,
  KAFKA_TOPIC_OBJECTS,
} = require("../utils/constants");

const processMessage = require("./process-message");

const init = (fastify) => {
  fastify.kafka.producer.on("error", (err) => {
    if (err) {
      fastify.log.error(err);
    }
  });

  fastify.kafka.consumer.on("error", (err) => {
    if (err) {
      fastify.log.error(err);
    }
  });

  fastify.kafka.subscribe(KAFKA_TOPIC_OBJECTS);
  fastify.kafka.on(KAFKA_TOPIC_OBJECTS, async (message, commit) => {
    processMessage(fastify, message, commit);
  });

  fastify.kafka.consume();
};

module.exports = init;
