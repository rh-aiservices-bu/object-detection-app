const { KAFKA_TOPIC_OBJECTS } = require("../utils/constants");

const processMessage = require("./process-message");

const init = (fastify) => {
  if (fastify.kafka?.producer) {
    fastify.kafka.producer.on("error", (err) => {
      if (err) {
        fastify.log.error(err);
      }
    });
  } else {
    fastify.log.error("Failed to connect Kafka producer %j");
  }

  if (fastify.kafka?.consumer) {
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
  } else {
    fastify.log.error("Failed to connect Kafka consumer %j");
  }
};

module.exports = init;
