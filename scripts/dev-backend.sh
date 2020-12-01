#!/usr/bin/env bash
printf "\n\n######## dev backend ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

ENV_FILE=${DIR}/../../.env.dev
if [ -f "${ENV_FILE}" ]; then
  source ${ENV_FILE}
  for ENV_VAR in $(sed 's/=.*//' ${ENV_FILE}); do export "${ENV_VAR}"; done
fi

cd ${DIR}/..
pwd

npm install
npm run build
PORT=${BACKEND_DEV_PORT} \
OBJECT_DETECTION_URL=${OBJECT_DETECTION_URL} \
KAFKA_BROKER_LIST=${KAFKA_BROKER_LIST} \
KAFKA_TOPIC=${KAFKA_TOPIC} \
npm run dev
