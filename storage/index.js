const S3Storage = require("./S3Storage");
const TmpStorage = require("./TmpStorage");

const {
  S3_ENDPOINT,
  S3_BUCKET,
  S3_PREFIX,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
} = require("../utils/constants");

let storage;
if (S3_ENDPOINT && S3_BUCKET && S3_PREFIX && S3_ACCESS_KEY_ID && S3_SECRET_ACCESS_KEY) {
  storage = new S3Storage(
    S3_ENDPOINT,
    S3_BUCKET,
    S3_PREFIX,
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY
  );
} else if (process.env.NODE_ENV === "development") {
  storage = new TmpStorage();
} else {
  storage = {
    writeFile: () => Promise.resolve(),
  };
}

module.exports = storage;
