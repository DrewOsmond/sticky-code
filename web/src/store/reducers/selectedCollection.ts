import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";
import { editMyCollection } from "./sessions";
interface Note {
  id: number;
  title: string;
  description: string;
  language: string;
}

interface Collection {
  id: number;
  name: string;
  notes: Note[];
}

interface Action {
  type: string;
  payload: Object[] | number;
}

const SELECT_COLLECTION = "collections/selectCollection";
const EDIT_COLLECTION = "collections/editCollection";

const makeSelectedCollection = (collection: Collection) => {
  return {
    type: SELECT_COLLECTION,
    payload: collection,
  };
};

export const selectCollection =
  (id: number, username: string) => async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch(
      `/api/collections/${username}/${id}`
    );
    if (response?.ok) {
      const data = await response.json();
      dispatch(makeSelectedCollection(data));
    }
  };

const editCollections = (collection: Collection) => {
  return {
    type: EDIT_COLLECTION,
    payload: collection,
  };
};

export const editCollection =
  (collection: Collection, name: string) => async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch("/api/collections/edit", {
      method: "PUT",
      body: JSON.stringify({ collection, name }),
    });
    if (response?.ok) {
      const data = await response.json();
      dispatch(editCollections(data));
      dispatch(editMyCollection(data));
    }
  };



const initialCollectionState: Collection = {
  id: 0,
  name: "null",
  notes: [
    {
      title: "404 not found",
      id: 0,
      description: "there's nothing here...",
      language: "there's nothing here...",
    },
  ],
};

const selectedCollection = (
  state: Collection = initialCollectionState,
  action: Action
) => {
  switch (action.type) {
    case SELECT_COLLECTION:
      return action.payload;
    default:
      return state;
  }
};

export default selectedCollection;
