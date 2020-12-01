const { OUTGOING_MESSAGE_TYPES } = require("../socket/message-types");
const concatObject = require("../utils/concat-object");

function processMessage(fastify, message, commit) {
  fastify.log.debug(
    `Kafka Object message received %j`,
    concatObject(JSON.parse(message.value.toString()))
  );
  let messageObj = JSON.parse(message.value.toString());

  let user;
  if (messageObj.userId) {
    user = global.users[messageObj.userId];
  }

  if (user && user.conn) {
    user.conn.socket.send(
      JSON.stringify({
        type: OUTGOING_MESSAGE_TYPES.OBJECT_DETECTION,
        ...messageObj,
      })
    );
  }
  commit();
}

module.exports = processMessage;
