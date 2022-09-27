export const GET_SCORES = "Home.GET_SCORES";
export const getScores = () => ({
  type: GET_SCORES,
  payload: {},
});

export const GET_SCORES_FULFILLED = "Home.GET_SCORES_FULFILLED";
export const getScoresFulfilled = (response) => ({
  type: GET_SCORES_FULFILLED,
  payload: {
    response,
  },
});

export const GET_SCORES_REJECTED = "Home.GET_SCORES_REJECTED";
export const getScoresRejected = (error) => ({
  type: GET_SCORES_REJECTED,
  payload: {
    error,
  },
});

export const GET_TAGS = "Home.GET_TAGS";
export const getTags = () => ({
  type: GET_TAGS,
  payload: {},
});

export const GET_TAGS_FULFILLED = "Home.GET_TAGS_FULFILLED";
export const getTagsFulfilled = (response) => ({
  type: GET_TAGS_FULFILLED,
  payload: {
    response,
  },
});

export const GET_TAGS_REJECTED = "Home.GET_TAGS_REJECTED";
export const getTagsRejected = (error) => ({
  type: GET_TAGS_REJECTED,
  payload: {
    error,
  },
});