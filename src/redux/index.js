import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./async/authSlice";
import restReducer from "./async/restSlice";
import langReducer from "./slices/langSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_SECRET_KEY,
  onError: function (error) {
    console.log(error);
  },
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['rest'],
    transforms: [encryptor],
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