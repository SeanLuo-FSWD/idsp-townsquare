import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import feedReducer from "./feed";
// import userReducer from "./user";
import filterReducer from "./filter";
import chatReducer from "./chat.rdc";
import noticeReducer from "./notice.rdc";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["filterState", "chatState"],
};

const rootReducer = combineReducers({
  // feedState: feedReducer,
  // usersState: userReducer,
  filterState: filterReducer,
  chatState: chatReducer,
  noticeState: noticeReducer,
});

// export default rootReducer;

export default persistReducer(persistConfig, rootReducer);
