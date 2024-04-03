import { configureStore, combineReducers } from "@reduxjs/toolkit"
import teamReducer from "./team/teamSlice.js"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
  team: teamReducer,
})
const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistantReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistantReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)
