import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createAxiosErrorNotification } from "../Notifications";
import {
  GET_SCORES,
  GET_TAGS,
  GET_USERTAGS,
  getScoresFulfilled,
  getScoresRejected,
  getTagsFulfilled,
  getTagsRejected,
  getUserTagsFulfilled,
  getUserTagsRejected
} from "./actions";

const apiUrlScores = "/api/scores";
const apiUrlTags = "/api/tags";
const apiUrlUserTags = "/api/usertags";

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

function* executeGetUserTags(action) {
  try {
    const response = yield call(axios, {
      method: "POST",
      url: apiUrlUserTags,
      data: {
        user: localStorage.getItem('user'),
      },
    });
    
    yield put(getUserTagsFulfilled(response));
  } catch (error) {
    yield put(createAxiosErrorNotification(error));
    yield put(getUserTagsRejected(error));
  }
}

export function* watchGetScores() {
  yield takeLatest(GET_SCORES, executeGetScores);
}

export function* watchGetTags() {
  yield takeLatest(GET_TAGS, executeGetTags);
}

export function* watchGetUserTags() {
  yield takeLatest(GET_USERTAGS, executeGetUserTags);
}

export default [watchGetScores(), watchGetTags(), watchGetUserTags()];