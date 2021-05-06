import { combineReducers } from "redux";
import feedReducer from "./feed";
import userReducer from "./user";
import filterReducer from "./filter";

const rootReducer = combineReducers({
  feedState: feedReducer,
  usersState: userReducer,
  filterState: filterReducer,
});

export default rootReducer;
