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

export const GET_USERTAGS = "Home.GET_USERTAGS";
export const getUserTags = () => ({
  type: GET_USERTAGS,
  payload: {},
});

export const GET_USERTAGS_FULFILLED = "Home.GET_USERTAGS_FULFILLED";
export const getUserTagsFulfilled = (response) => ({
  type: GET_USERTAGS_FULFILLED,
  payload: {
    response,
  },
});

export const GET_USERTAGS_REJECTED = "Home.GET_USERTAGS_REJECTED";
export const getUserTagsRejected = (error) => ({
  type: GET_USERTAGS_REJECTED,
  payload: {
    error,
  },
});