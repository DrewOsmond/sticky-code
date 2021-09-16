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
import searchReducer from "./reducers/searchResults";
import allCategoriesReducer from "./reducers/categories";

export const store = createStore(
  combineReducers({
    session: sessionReducer,
    search: searchReducer,
    allCategories: allCategoriesReducer,
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
