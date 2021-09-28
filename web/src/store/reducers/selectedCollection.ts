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
const DELETE_NOTE_FROM_COLLECTION = "collections/deleteNoteFromCollection";
const DELETE_USER_NOTE_FROM_COLLECTION =
  "collections/deleteUsersNoteFromCollection";

const removePersonalNoteFromCollection = (noteId: number) => {
  return {
    type: DELETE_USER_NOTE_FROM_COLLECTION,
    payload: noteId,
  };
};

export const deletePersonalNoteFromCollection =
  (noteId: number) => (dispatch: Dispatch) =>
    dispatch(removePersonalNoteFromCollection(noteId));

const makeSelectedCollection = (collection: Collection) => {
  return {
    type: SELECT_COLLECTION,
    payload: collection,
  };
};

export const selectCollection =
  (id: number, username: string) => async (dispatch: Dispatch) => {
    dispatch(makeSelectedCollection({ id: 0, name: "loading", notes: [] }));
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
  (collection: Collection, name: string, personal: string) =>
  async (dispatch: Dispatch) => {
    const isPersonal = personal === "private" ? true : false;
    const response = await csrfProtectedFetch("/api/collections/edit", {
      method: "PUT",
      body: JSON.stringify({ collection, name, isPersonal }),
    });
    if (response?.ok) {
      const data = await response.json();
      dispatch(editCollections(data));
      dispatch(editMyCollection(data));
    }
  };

const deleteNoteFromMyCollection = (updatedCollection: Collection) => {
  return {
    type: DELETE_NOTE_FROM_COLLECTION,
    payload: updatedCollection,
  };
};

export const deleteFromCollection =
  (collection: Collection, note: Note) => async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch("/api/collections/remove-note", {
      method: "DELETE",
      body: JSON.stringify({ collection, note }),
    });

    if (response?.ok) {
      const data = await response.json();
      dispatch(deleteNoteFromMyCollection(data));
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
    case DELETE_NOTE_FROM_COLLECTION:
      return action.payload;
    case EDIT_COLLECTION: {
      return action.payload;
    }
    case DELETE_USER_NOTE_FROM_COLLECTION:
      const filteredNotes = state.notes.filter(
        (note) => note.id !== action.payload
      );
      state.notes = filteredNotes;
      return { ...state };
    default:
      return state;
  }
};

export default selectedCollection;
