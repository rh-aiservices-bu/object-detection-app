"use strict";

const moment = require("moment");
const _ = require("lodash");
const storage = require("../../../storage");
const axios = require("../../../utils/axios");
const { DBAPI_URL , KAFKA_TOPIC_IMAGES } = require("../../../utils/constants");
const imageStoragePrefix = "images";

module.exports = async function (fastify, opts) {
  fastify.post("/", async function (request, reply) {
    const user = _.get(request, "body.user");
    if (!user) {
      reply.code(422);
      return {
        status: "error",
        statusCode: 422,
        message: "Missing Fields: user",
      };
    }
    const { code, data } = await requestTags(user);
    reply.code(code);
    return data;
  });
};

async function requestTags(user) {
  let code, data;
  try {
    const response = await axios({
      method: "GET",
      url: DBAPI_URL + "/api/v1/labels/" + user,
    });
    code = response.status;
    data = response.data;
  } catch (error) {
    if (error.response) {
      code = error.response.status;
      data = {
        status: "error",
        statusCode: error.response.status,
        message: `Error from object detection service: ${error.message}`,
        data: error.response.data,
      };
    } else if (error.request) {
      code = 500;
      data = {
        status: "error",
        statusCode: 500,
        message: `No response was received from object detection service: ${error.message}`,
      };
    } else {
      code = 500;
      data = {
        status: "error",
        statusCode: 500,
        message: error.message,
      };
    }
  }

  return { code, data };
}
