const { KAFKA_BROKER_LIST } = require("../utils/constants");

let config;

console.log(KAFKA_BROKER_LIST);
if (KAFKA_BROKER_LIST) {
  config = {
    producer: {
      "metadata.broker.list": KAFKA_BROKER_LIST,
      dr_cb: true,
    },
    consumer: {
      //'debug': 'all',
      "metadata.broker.list": KAFKA_BROKER_LIST,
      "group.id": "object-detection-app-consumer",
      "enable.auto.commit": false,
    },
  };
}

module.exports = config;
