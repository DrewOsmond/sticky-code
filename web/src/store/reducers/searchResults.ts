import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";

const LOOKUP_SEARCH = "search/lookupSearch";

const search = (terms: string[]) => {
  return {
    type: LOOKUP_SEARCH,
    payload: terms,
  };
};
