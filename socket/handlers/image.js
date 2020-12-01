const { KAFKA_TOPIC_IMAGES } = require("../../utils/constants");
const concatObject = require("../../utils/concat-object");

async function imageHandler(fastify, conn, messageObj) {
  fastify.log.debug("imageHandler %j", concatObject(messageObj));
  sendKafkaMsg(
    fastify,
    KAFKA_TOPIC_IMAGES,
    messageObj.userId,
    formatKafkaMsg(messageObj)
  );
}

function formatKafkaMsg({ userId, image, date, time }) {
  return JSON.stringify({ userId, image, date, time });
}

function sendKafkaMsg(fastify, topic, key, payload) {
  const shrunk = concatObject(JSON.parse(payload));
  fastify.log.debug(
    `kafka produce topic: %s; key: %s; payload: %j`,
    topic,
    key,
    shrunk
  );
  try {
    // let kafkaMsg = Buffer.from(jsonMsg);
    // let result = fastify.kafka.producer.produce(KAFKA_TOPIC, -1, kafkaMsg, null);
    let result = fastify.kafka.push({ topic, payload, key });
    fastify.log.debug("Pushed message %j", shrunk);
  } catch (error) {
    fastify.log.error(
      "kafka producer failed to send message. Error: %s",
      error.message
    );
  }
}

module.exports = imageHandler;
