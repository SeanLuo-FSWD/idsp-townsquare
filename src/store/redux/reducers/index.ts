import { combineReducers } from "redux";
import feedReducer from "./feed";
import userReducer from "./user";
import filterReducer from "./filter";
import chatReducer from "./chat.rdc";

const rootReducer = combineReducers({
  feedState: feedReducer,
  usersState: userReducer,
  filterState: filterReducer,
  chatState: chatReducer,
});

export default rootReducer;
