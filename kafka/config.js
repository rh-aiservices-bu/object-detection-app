const {
  KAFKA_BOOTSTRAP_SERVER,
  KAFKA_SECURITY_PROTOCOL,
  KAFKA_SASL_MECHANISM,
  KAFKA_USERNAME,
  KAFKA_PASSWORD
} = require("../utils/constants");

const { logLevel } = require('kafkajs');

let config;

if (KAFKA_BOOTSTRAP_SERVER) {
  const sasl = KAFKA_USERNAME && KAFKA_PASSWORD
    ? {
      username: KAFKA_USERNAME,
      password: KAFKA_PASSWORD,
      mechanism: KAFKA_SASL_MECHANISM.toLowerCase(),
    }
    : null;

  const ssl = !!sasl;

  config = {
    // clientId: `odapp`,
    brokers: [KAFKA_BOOTSTRAP_SERVER],
    // connectionTimeout: 15000,
    // authenticationTimeout: 15000,
    // reauthenticationThreshold: 10000,
    // logLevel: logLevel.INFO,
    // retry: {
    //   initialRetryTime: 100,
    //   retries: 8
    // },
    ssl,
    sasl
  };
}

module.exports = config;
