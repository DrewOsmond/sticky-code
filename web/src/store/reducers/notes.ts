import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";

const ADD_NOTE = "notes/addNote";
const DELETE_NOTE = "notes/deleteNote";

interface Note {
  id: number;
  title: string;
  description: string;
  language: string;
  categoryId: number;
}

interface Action {
  type: string;
  payload: Object[] | number;
}

const add = (note: Note) => {
  return {
    type: ADD_NOTE,
    payload: note,
  };
};

export const addNote = (note: Note) => async (dispatch: Dispatch) => {
  const response = await csrfProtectedFetch("/api/notes/add", {
    method: "POST",
    body: JSON.stringify(note),
  });
  if (response?.ok) {
    const data = await response.json();
    dispatch(add(data));
  }
};

const dltNote = (id: Number) => {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
};

export const deleteNote = (note: Note) => async (dispatch: Dispatch) => {
  const response = await csrfProtectedFetch("/api/notes/delete", {
    method: "DELETE",
    body: JSON.stringify(note),
  });
  if (response?.ok) {
    const data = await response.json();
    dispatch(dltNote(data));
  }
};

const initialState: Note[] = [];

const notesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [action.payload, ...state];
    case DELETE_NOTE:
      return state.filter((notes) => notes.id !== action.payload);
    default:
      return state;
  }
};

export default notesReducer;
