"use strict";

const moment = require("moment");
const _ = require("lodash");
const storage = require("../../../storage");
const axios = require("../../../utils/axios");
const {
  OBJECT_DETECTION_URL,
  KAFKA_TOPIC_IMAGES,
} = require("../../../utils/constants");
const imageStoragePrefix = "images";

module.exports = async function (fastify, opts) {
  fastify.post("/", async function (request, reply) {
    const image = _.get(request, "body.image");
    if (!image) {
      reply.code(422);
      return {
        status: "error",
        message: "Missing Fields: image",
      };
    }

    const base64data = image.replace(
      /^da36ta:image\/(png|jpg|jpeg);base64,/,
      ""
    );
    const buff = Buffer.from(base64data, "base64");

    let file;
    try {
      file = await writeJpg(buff, request);
    } catch (error) {
      request.log.error("error occurred writing photo");
      request.log.error(error);
    }

    return requestObjectDetection(base64data);
  });
};

async function writeJpg(data, request) {
  const photoId = generateFilename();
  try {
    const response = await storage.writeFile(data, photoId);
    return photoId;
  } catch (error) {
    request.log.error(`Failure to write ${photoId} to storage`);
    throw error;
  }
}

function generateFilename() {
  const date = moment().format("YYYYMMDD-HH:mm:ss:SSS");
  const random = Math.random().toString(36).slice(-5);
  return `${imageStoragePrefix}/${date}-${random}.jpg`;
}

async function requestObjectDetection(image) {
  const response = await axios({
    method: "POST",
    url: OBJECT_DETECTION_URL,
    data: { image },
  });
  return response.data;
}

