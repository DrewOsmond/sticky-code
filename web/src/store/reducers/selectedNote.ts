import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";

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

interface Comment {
  id: number;
  description: string;
  userId: number;
  noteId: number;
}

const SELECT_NOTE = "note/selectNote";
const UPDATE_NOTE = "note/updateNote";
const ADD_COMMENT = "notes/addComment";
const DELETE_COMMENT = "notes/deleteComment";
const UPDATE_COMMENT = "notes/updateComment";

const addComment = (comment: Comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  };
};

export const fetchAddComment =
  (comment: string, noteId: number, userId: number) =>
  async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch("/api/comments/add", {
      method: "POST",
      body: JSON.stringify({ comment, noteId, userId }),
    });

    if (response?.ok) {
      const data = await response.json();
      dispatch(addComment(data));
    }
  };

const updateComment = (comment: Comment) => {
  return {
    type: UPDATE_COMMENT,
    payload: comment,
  };
};

export const fetchUpdateComment =
  (comment: Comment, update: string) => async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch("/comments/update", {
      method: "PUT",
      body: JSON.stringify({ comment, update }),
    });

    if (response?.ok) {
      const data = await response.json();
      dispatch(updateComment(data));
    }
  };

const deleteComment = (id: number) => {
  return {
    type: DELETE_COMMENT,
    payload: id,
  };
};

export const fetchDeleteComment =
  (comment: Comment) => async (dispatch: Dispatch) => {
    const response = csrfProtectedFetch("/api/comments/delete", {
      method: "DELETE",
      body: JSON.stringify(comment),
    });
    dispatch(deleteComment(comment.id));
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
    case ADD_COMMENT:
      state.comments.unshift(action.payload);
      return { ...state };
    case UPDATE_COMMENT:
      const commentToSwap: any = action.payload;
      for (let i = 0; i < state.comments; i++) {
        if (state.comments[i] === commentToSwap.id) {
          state.comments[i] = action.payload;
        }
      }
      return { ...state };
    case DELETE_COMMENT:
      state.comments = state.comments.filter(
        (comment: any) => comment.id !== action.payload
      );
      return { ...state };
    default:
      return state;
  }
};

export default selectedNoteReducer;
