import { combineReducers } from "redux";
import feedReducer from "./feed";

const rootReducer = combineReducers({
  feedState: feedReducer,
});

export default rootReducer;
