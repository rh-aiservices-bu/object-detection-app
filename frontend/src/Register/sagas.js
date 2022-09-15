import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createAxiosErrorNotification } from "../Notifications";
import {
  REGISTER_USER,
  registerUserFulfilled,
  registerUserRejected,
} from "./actions";

const apiUrl = "/api/register";

function* executeRegisterUser(action) {
  console.log(action);
  try {
    const response = yield call(axios, {
      method: "POST",
      url: apiUrl,
      data: {
        register: action.payload.register,
      },
    });

    action.callback();
    
    yield put(registerUserFulfilled(response));
  } catch (error) {
    yield put(createAxiosErrorNotification(error));
    yield put(registerUserRejected(error));
  }
}

export function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER, executeRegisterUser);
}

export default [watchRegisterUser()];
