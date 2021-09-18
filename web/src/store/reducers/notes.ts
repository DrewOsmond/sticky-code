import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";

const ADD_NOTE = "notes/addNote";
const DELETE_NOTE = "notes/deleteNote";
const SELECT_NOTE = "note/selectNote";
const UPDATE_NOTE = "note/updateNote";
interface Note {
  id: number;
  title: string;
  description: string;
  language: string;
  [key: string]: any;
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

const dltNote = (id: number) => {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
};

export const deleteNote = (note: Note) => async (dispatch: Dispatch) => {
  const { id } = note;
  dispatch(dltNote(id));
  await csrfProtectedFetch("/api/notes/delete", {
    method: "DELETE",
    body: JSON.stringify({ note }),
  });
};

const initialState: Note[] = [];

const notesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [action.payload, ...state];
    case DELETE_NOTE:
      return [...state.filter((notes) => notes.id !== action.payload)];
    default:
      return state;
  }
};

const selectNote = (note: Note) => {
  return {
    type: SELECT_NOTE,
    payload: note,
  };
};

export const fetchNote = (id: number) => async (dispatch: Dispatch) => {
  const response = await csrfProtectedFetch(`/api/notes/get/${id}`);
  if (response?.ok) {
    const data = await response.json();
    dispatch(selectNote(data));
  }
};

const updateNote = (note: Note) => {
  return {
    type: UPDATE_NOTE,
    payload: note,
  };
};

export const fetchUpdateNote =
  (note: Note, title: string, description: string) =>
  async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch("/api/notes/update", {
      method: "PUT",
      body: JSON.stringify({ note, title, description }),
    });
    if (response?.ok) {
      const data = await response.json();
      dispatch(updateNote(data));
    }
  };

const initalNoteState: Note = {
  id: 0,
  title: "no note found",
  description: "please select a note",
  language: "undefined",
};

export const selectedNoteReducer = (
  state: Note = initalNoteState,
  action: Action
) => {
  switch (action.type) {
    case SELECT_NOTE:
      return action.payload;
    case UPDATE_NOTE:
      return action.payload;
    default:
      return state;
  }
};

export default notesReducer;
