import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";

const GET_CATEGORIES = "get/categories";

const grabCategories = (results: object[]) => {
  return {
    type: GET_CATEGORIES,
    payload: results,
  };
};

interface Action {
  type: string;
  payload: Object[];
}

export const getCategories = () => async (dispatch: Dispatch) => {
  const response = await csrfProtectedFetch("/api/categories/all");
  if (response?.ok) {
    const data: Object[] = await response.json();
    dispatch(grabCategories(data));
  }
};

const initialState: string[] = ["functions", "arrays"];

const allCategoriesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export default allCategoriesReducer;
