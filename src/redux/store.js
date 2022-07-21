import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const appReducer = combineReducers({user:userReducer,product:productReducer});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT_REQUEST') {
      // for all keys defined in your persistConfig(s)
      storage.removeItem('persist:root')
      // storage.removeItem('persist:otherKey')

      return appReducer(undefined, action);
  }
  return appReducer(state, action);
};


const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})