import { combineReducers } from "redux";
import { appReducer } from "../App/reducers";
import { homeReducer } from "../Home/reducers";
import { photoReducer } from "../Photo/reducers";
import { videoReducer } from "../Video/reducers";

const rootReducer = combineReducers({
  appReducer,
  homeReducer,
  photoReducer,
  videoReducer,
});

export default rootReducer;
