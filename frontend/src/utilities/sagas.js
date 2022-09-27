import { all } from "redux-saga/effects";
import socketSagas from "../Socket/sagas";
import appSagas from "../App/sagas";
import photoSagas from "../Photo/sagas";
import videoSagas from "../Video/sagas";
import registerSagas from "../Register/sagas";
import homeSagas from "../Home/sagas";

export default function* rootSaga() {
  yield all([...socketSagas, ...appSagas, ...photoSagas, ...videoSagas, ...registerSagas, ...homeSagas]);
}
