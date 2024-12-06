import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./async/authSlice";
import restReducer from "./async/restSlice";
import langReducer from "./slices/langSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['rest'],
  };

const persistedAuth = persistReducer(persistConfig, authReducer);
const persistedLang = persistReducer(persistConfig, langReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuth,
    lang: persistedLang,
    rest: restReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };