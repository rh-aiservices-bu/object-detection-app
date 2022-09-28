const env = require("env-var");
const PORT = env.get("PORT").default("8080").asString();
const IP = env.get("IP").default("0.0.0.0").asString();
const LOG_LEVEL = env.get("LOG_LEVEL").default("info").asString();
const DBAPI_URL = env
  .get("DBAPI_URL")
  .default("http://dbapi:8080")
  .asString();
const OBJECT_DETECTION_URL = env
  .get("OBJECT_DETECTION_URL")
  .default("http://object-detection-rest:8080")
  .asString();
const S3_ENDPOINT = env.get("S3_ENDPOINT").asString();
const S3_BUCKET = env.get("S3_BUCKET").asString();
const S3_PREFIX = env.get("S3_PREFIX").asString();
const S3_ACCESS_KEY_ID = env.get("S3_ACCESS_KEY_ID").asString();
const S3_SECRET_ACCESS_KEY = env.get("S3_SECRET_ACCESS_KEY").asString();
const KAFKA_BOOTSTRAP_SERVER = env.get("KAFKA_BOOTSTRAP_SERVER").asString();
const KAFKA_SECURITY_PROTOCOL = env.get("KAFKA_SECURITY_PROTOCOL").asString();
const KAFKA_SASL_MECHANISM = env.get("KAFKA_SASL_MECHANISM").asString();
const KAFKA_USERNAME = env.get("KAFKA_USERNAME").asString();
const KAFKA_PASSWORD = env.get("KAFKA_PASSWORD").asString();
const KAFKA_CONSUMER_GROUP = "object-detection-app-consumer";
const KAFKA_TOPIC_IMAGES = env.get("KAFKA_TOPIC_IMAGES").asString();
const KAFKA_TOPIC_OBJECTS = env.get("KAFKA_TOPIC_OBJECTS").asString();

const constants = {
  PORT,
  IP,
  LOG_LEVEL,
  DBAPI_URL,
  OBJECT_DETECTION_URL,
  S3_ENDPOINT,
  S3_BUCKET,
  S3_PREFIX,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  KAFKA_BOOTSTRAP_SERVER,
  KAFKA_SECURITY_PROTOCOL,
  KAFKA_SASL_MECHANISM,
  KAFKA_USERNAME,
  KAFKA_PASSWORD,
  KAFKA_CONSUMER_GROUP,
  KAFKA_TOPIC_IMAGES,
  KAFKA_TOPIC_OBJECTS,
};

console.log(constants)
module.exports = constants;
