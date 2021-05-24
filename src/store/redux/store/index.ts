import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import { persistStore } from "redux-persist";

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const persistor = persistStore(store);

// export default store;
export { store, persistor };
