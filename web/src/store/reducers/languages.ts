import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";

interface Action {
  type: string;
  payload: {
    user: string;
  };
}

const SELECT_LANGUAGE = "languages/selectLanguages";
const ALL_LANGUAGES = "languages/allLanguages";

const allLanguages = (languages: Object[]) => {
  return {
    type: ALL_LANGUAGES,
    payload: languages,
  };
};

export const getAllLanguages = () => async (dispatch: Dispatch) => {
  const response = await csrfProtectedFetch("/api/languages/all");

  if (response?.ok) {
    const languages = await response.json();
    dispatch(allLanguages(languages));
  }
};

const selectLanguage = (language: string) => {
  return {
    type: SELECT_LANGUAGE,
    payload: language,
  };
};

export const selectSpecificLanguage =
  (language: string) => async (dispatch: Dispatch) => {
    dispatch(selectLanguage(language));
  };

const initialState: string = "loading...";

const languageReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SELECT_LANGUAGE:
      return action.payload;
    case ALL_LANGUAGES:
      return action.payload;
    default:
      return state;
  }
};

export default languageReducer;
