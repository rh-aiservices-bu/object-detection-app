import { call, put, takeEvery } from "redux-saga/effects";
import { sendOutgoingMessage } from "../../Socket/actions";
import { SEND_IMAGE } from "../actions";

import { OUTGOING_MESSAGE_TYPES } from "../../Socket/messageTypes";

function* executeSendImage(action) {
  yield put(
    sendOutgoingMessage({
      type: OUTGOING_MESSAGE_TYPES.IMAGE,
      ...action.payload,
    })
  );
}

export function* watchSendImage() {
  yield takeEvery(SEND_IMAGE, executeSendImage);
}
