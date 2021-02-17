const {
  KAFKA_BOOTSTRAP_SERVER,
  KAFKA_SECURITY_PROTOCOL,
  KAFKA_SASL_MECHANISM,
  KAFKA_USERNAME,
  KAFKA_PASSWORD
} = require("../utils/constants");

let config;

if (KAFKA_BOOTSTRAP_SERVER) {
  let commonConfig;

  if (KAFKA_USERNAME && KAFKA_PASSWORD) {
    commonConfig = {
      // "debug": "all",
      // "debug": "security,broker",
      "bootstrap.servers": KAFKA_BOOTSTRAP_SERVER,
      "security.protocol": KAFKA_SECURITY_PROTOCOL.toLowerCase(),
      "sasl.mechanisms": KAFKA_SASL_MECHANISM,
      "sasl.username": KAFKA_USERNAME,
      "sasl.password": KAFKA_PASSWORD,
      "enable.ssl.certificate.verification": false,
    };
  } else {
    commonConfig = {
      // "debug": "all",
      // "debug": "security,broker",
      "metadata.broker.list": KAFKA_BOOTSTRAP_SERVER,
    };
  }
  config = {
    producer: {
      ...commonConfig,
      "dr_cb": true,
    },
    consumer: {
      ...commonConfig,
      "group.id": "object-detection-app-consumer",
      "enable.auto.commit": false,
    },
  };
}

module.exports = config;
