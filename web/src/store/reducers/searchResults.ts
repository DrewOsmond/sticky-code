import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";

interface Action {
  type: string;
  payload: Object[];
}

const LOOKUP_SEARCH = "search/lookupSearch";
// const RECENT_SEARCH = "search/recentSearch";

const search = (results: object[]) => {
  return {
    type: LOOKUP_SEARCH,
    payload: results,
  };
};

export const recentSearch = () => async (dispatch: Dispatch) => {
  const response = await csrfProtectedFetch("/api/search/posts/recent");
  if (response?.ok) {
    const data = await response.json();
    dispatch(search(data));
  }
};

export const searchFor =
  (searchTerms: string[]) => async (dispatch: Dispatch) => {
    const [term, language] = searchTerms;
    const response = await csrfProtectedFetch(
      // `/api/search/${language}/${term}`
      `/api/search/${term}`
    ).catch(console.error);
    if (response) {
      const data: Object[] = await response.json();
      dispatch(search(data));
    }
  };

interface Search {
  title: string;
  description: string;
}

const initalState: Search[] = [];

const searchReducer = (state = initalState, action: Action) => {
  switch (action.type) {
    case LOOKUP_SEARCH:
      return [...action.payload];
    default:
      return state;
  }
};

export default searchReducer;
