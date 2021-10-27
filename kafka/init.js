const { KAFKA_TOPIC_OBJECTS } = require("../utils/constants");
const processMessage = require("./process-message");

const init = async (fastify) => {
  const consumer = fastify.kafka.instance.consumer({
    groupId: `odapp-${KAFKA_TOPIC_OBJECTS}-consumer`,
  });

  await consumer.connect();
  await consumer.subscribe({
    topic: KAFKA_TOPIC_OBJECTS,
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      processMessage(fastify, message);
    },
  });

  fastify.kafka.consumers.objects = consumer;

  const producer = fastify.kafka.instance.producer();
  await producer.connect();
  fastify.kafka.producers.images = producer;
};

module.exports = init;
