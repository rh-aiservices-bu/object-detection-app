import {
  GET_SCORES,
  GET_SCORES_FULFILLED,
  GET_SCORES_REJECTED,
  GET_TAGS,
  GET_TAGS_FULFILLED,
  GET_TAGS_REJECTED
} from "./actions";

const initialState = {
  scoresResponse: null,
  scores: {
    score: 0, scores: []
  },
  scoresError: null,
  tagsResponse: null,
  tags: [],
  tagsError: null,
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCORES:
      return {
        ...state,
        scoresResponse: null,
        scoresError: null,
      };
    case GET_SCORES_FULFILLED:
      console.log(action?.payload?.response?.data)
      return {
        ...state,
        scoresResponse: action?.payload?.response,
        scores: action?.payload?.response?.data,
        scoresError: null,
      };
    case GET_SCORES_REJECTED:
      return {
        ...state,
        scoresResponse: null,
        scores: null,
        scoresError: action?.payload?.error,
      };
      case GET_TAGS:
        return {
          ...state,
          tagsResponse: null,
          tags: [],
          tagsError: null,
        };
      case GET_TAGS_FULFILLED:
        console.log(action?.payload?.response?.data)
        return {
          ...state,
          tagsResponse: action?.payload?.response,
          tags: action?.payload?.response?.data,
          tagsError: null,
        };
      case GET_TAGS_REJECTED:
        return {
          ...state,
          tagsResponse: null,
          tags: null,
          tagsError: action?.payload?.error,
        };
    default:
      return state;
  }
};