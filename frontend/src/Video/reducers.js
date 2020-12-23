import { RESET_VIDEO } from "./actions";
import { WS_INCOMING_MESSAGE } from "../Socket/actions";
import { INCOMING_MESSAGE_TYPES } from "../Socket/messageTypes";
import assignLabels from "../utilities/assignLabels";

const initialState = {
  labelSettings: {},
  minScore: 0.0,
};

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
      newValues.labelSettings = assignLabels(state.labelSettings, data?.prediction);
  }
  return { ...state, ...newValues };
}
