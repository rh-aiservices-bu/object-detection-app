"use strict";

const path = require("path");
const Static = require("fastify-static");
const AutoLoad = require("fastify-autoload");
const Sensible = require("fastify-sensible");

const WebSocket = require("fastify-websocket");
const processSocketMessage = require("./socket/process-socket-message");
const socketInit = require("./socket/init");

const Kafka = require("fastify-kafka");
const kafkaConfig = require("./kafka/config");
const kafkaInit = require("./kafka/init");

global.users = {};

const wsOpts = {
  maxPayload: 2 * 1024 * 1024 * 1024, // 2GB
  path: "/socket",
};

module.exports = async function (fastify, opts) {
  fastify.register(Sensible);

  fastify.register(Static, {
    root: path.join(__dirname, "frontend/build"),
    wildcard: false,
  });

  fastify.register(Kafka, kafkaConfig);

  fastify.register(WebSocket, {
    handle: (conn) => {
      conn.socket.on("message", (message) => {
        processSocketMessage(fastify, conn, message);
      });
    },
    options: wsOpts,
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  fastify.ready(() => {
    socketInit(fastify);
    kafkaInit(fastify);
  });
};
