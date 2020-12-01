import get from "lodash/get";
import {
  RESET_SEARCH,
  SEARCH_PHOTO_PENDING,
  SEARCH_PHOTO_FULFILLED,
  SEARCH_PHOTO_REJECTED,
} from "./actions";

const initialState = {
  inferencePending: false,
  inferenceResponse: null,
  inference: null,
  inferenceError: null,
};

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SEARCH:
      return initialState;
    case SEARCH_PHOTO_PENDING:
      return {
        ...state,
        inferencePending: true,
        inferenceResponse: null,
        inference: null,
      };
    case SEARCH_PHOTO_FULFILLED:
      return {
        ...state,
        inferencePending: false,
        inferenceResponse: get(action, "payload.response"),
        inference: get(action, "payload.response.data"),
      };
    case SEARCH_PHOTO_REJECTED:
      return {
        ...state,
        inferencePending: false,
        inferenceError: get(action, "payload.response.error"),
      };
    default:
      return state;
  }
};
