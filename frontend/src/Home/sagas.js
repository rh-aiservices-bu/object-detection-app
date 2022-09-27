import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createAxiosErrorNotification } from "../Notifications";
import {
  GET_SCORES,
  GET_TAGS,
  getScoresFulfilled,
  getScoresRejected,
  getTagsFulfilled,
  getTagsRejected
} from "./actions";

const apiUrlScores = "/api/scores";
const apiUrlTags = "/api/tags";

function* executeGetScores(action) {
  try {
    console.log("Sending");
    const response = yield call(axios, {
      method: "POST",
      url: apiUrlScores,
      data: {
        user: localStorage.getItem('user'),
      },
    });
    
    yield put(getScoresFulfilled(response));
  } catch (error) {
    yield put(createAxiosErrorNotification(error));
    yield put(getScoresRejected(error));
  }
}
 
function* executeGetTags(action) {
  try {
    const response = yield call(axios, {
      method: "GET",
      url: apiUrlTags,
    });
    
    yield put(getTagsFulfilled(response));
  } catch (error) {
    yield put(createAxiosErrorNotification(error));
    yield put(getTagsRejected(error));
  }
}

export function* watchGetScores() {
  yield takeLatest(GET_SCORES, executeGetScores);
}

export function* watchGetTags() {
  yield takeLatest(GET_TAGS, executeGetTags);
}
  
export default [watchGetScores(), watchGetTags()];