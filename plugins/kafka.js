const fp = require("fastify-plugin");
const { Kafka } = require("kafkajs");

const fn = (fastify, opts, next) => {
  fastify.decorate("kafka", {
    instance: new Kafka(opts),
    consumers: {},
    producers: {},
  });

  next();
};

module.exports = fp(fn, {
  fastify: ">=3",
});
