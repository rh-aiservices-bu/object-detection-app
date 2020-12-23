import {
  RESET_SEARCH,
  SEARCH_PHOTO_PENDING,
  SEARCH_PHOTO_FULFILLED,
  SEARCH_PHOTO_REJECTED,
} from "./actions";
import assignLabels from "../utilities/assignLabels";

const initialState = {
  predictionPending: false,
  predictionResponse: null,
  prediction: null,
  predictionError: null,
  labelSettings: {},
  minScore: 0.0,
};

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SEARCH:
      return initialState;
    case SEARCH_PHOTO_PENDING:
      return {
        ...state,
        predictionPending: true,
        predictionResponse: null,
        prediction: null,
      };
    case SEARCH_PHOTO_FULFILLED:
      return {
        ...state,
        predictionPending: false,
        predictionResponse: action?.payload?.response,
        prediction: action?.payload?.response?.data,
        labelSettings: assignLabels(state.labelSettings, action?.payload?.response?.data),
      };
    case SEARCH_PHOTO_REJECTED:
      return {
        ...state,
        predictionPending: false,
        predictionError: action?.payload?.response?.error,
      };
    default:
      return state;
  }
};
