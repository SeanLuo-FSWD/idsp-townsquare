import { combineReducers } from "redux";
import feedReducer from "./feed";
import userReducer from "./user";

const rootReducer = combineReducers({
  feedState: feedReducer,
  usersState: userReducer,
});

export default rootReducer;
