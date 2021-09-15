import {
  // configureStore,
  ThunkAction,
  Action,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import sessionReducer from "./reducers/sessions";
import languageReducer from "./reducers/languages";

export const store = createStore(
  combineReducers({
    session: sessionReducer,
    language: languageReducer,
  }),
  undefined,
  applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
