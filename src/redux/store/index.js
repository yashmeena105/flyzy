import { createStore } from "redux";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import RootReducers from "../reducers/index";
const persistConfig = {
  key: "root",
  storage,
};

const persistrdReducer = persistReducer(persistConfig, RootReducers);
export const store = createStore(persistrdReducer);
export const persistor = persistStore(store);
