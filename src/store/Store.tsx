import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/AppSlice";
import { composeWithDevTools } from "redux-devtools-extension";

const combinedReducer = combineReducers({
  app: appSlice,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === "logout") {
    return combinedReducer(undefined, { type: undefined });
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
