const { KAFKA_BROKER_LIST } = require("../utils/constants");

const config = {
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

module.exports = config;
