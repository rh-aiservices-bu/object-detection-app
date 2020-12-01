import get from "lodash/get";
import { RESET_VIDEO } from "./actions";
import { WS_INCOMING_MESSAGE } from "../Socket/actions";
import { INCOMING_MESSAGE_TYPES } from "../Socket/messageTypes";

const initialState = {};

export const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_VIDEO:
      return initialState;
    case WS_INCOMING_MESSAGE:
      return processWsMessage(state, action.payload);
    default:
      return state;
  }
};

function processWsMessage(state, message) {
  const { type, ...data } = message;
  let newValues = {};

  switch (type) {
    case INCOMING_MESSAGE_TYPES.OBJECT_DETECTION:
      newValues = data;
      break;
    // default:
    //   newValues = data;
  }
  return { ...state, ...newValues };
}
