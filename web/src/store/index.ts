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
import notesReducer from "./reducers/notes";
import selectedNoteReducer from "./reducers/selectedNote";
import selectCollectionReducer from "./reducers/selectedCollection";

export const store = createStore(
  combineReducers({
    session: sessionReducer,
    search: searchReducer,
    notes: notesReducer,
    selectedNote: selectedNoteReducer,
    selectedCollection: selectCollectionReducer,
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
