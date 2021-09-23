import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";

interface Action {
  type: string;
  payload: {
    user: string;
    id: number;
    [key: string]: any;
  };
}

interface Note {
  id: number;
  title: string;
  description: string;
  language: string;
}
interface User {
  id?: number;
  username: string;
  password?: string;
  email?: string;
  favorite_notes?: any[];
  favorite_collections?: any[];
}

interface Collection {
  id: number;
  name: string;
}

const LOGIN_USER = "session/setUser";
const LOGOUT_USER = "session/logoutUser";
const ADD_FAVORITE = "session/addFavoriteNote";
const REMOVE_FAVORITE = "session/removeFavoriteNote";
const ADD_COLLECTION = "session/addCollection";
const REMOVE_COLLECTION = "session/removeCollection";
const EDIT_COLLECTION = "session/editCollection";

const loginUser = (user: {}) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};

const logoutUser = () => {
  return { type: LOGOUT_USER };
};

export const logout = () => async (dispatch: Dispatch) => {
  const response = await csrfProtectedFetch("/api/users/logout", {
    method: "DELETE",
  });
  if (response?.ok) {
    dispatch(logoutUser());
  }
};

export const signup = (user: User) => async (dispatch: Dispatch) => {
  const { username, email, password } = user;
  const response = await csrfProtectedFetch("/api/users/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  if (response?.ok) {
    const userData = await response.json();
    dispatch(loginUser(userData.user));
    return response;
  }
};

export const login = (user: User) => async (dispatch: Dispatch) => {
  const { username, password } = user;
  const response = await csrfProtectedFetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (response?.ok) {
    const userData = await response.json();
    dispatch(loginUser(userData));
    return response;
  }
};

export const restore = () => async (dispatch: Dispatch) => {
  const response = await csrfProtectedFetch("/api/users/restore");
  if (response?.ok) {
    const userData = await response?.json();
    dispatch(loginUser(userData));
  }
};

const addFavoriteNotes = (note: Note) => {
  return {
    type: ADD_FAVORITE,
    payload: note,
  };
};

export const addFavoriteNote =
  (user: User, note: Note) => async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch("/api/users/add-favorite-note", {
      method: "POST",
      body: JSON.stringify({ user, note }),
    });
    if (response?.ok) {
      dispatch(addFavoriteNotes(note));
    }
  };

const removeFromFavoriteNotes = (note: Note) => {
  return {
    type: REMOVE_FAVORITE,
    payload: note,
  };
};

export const removeFavoriteNote =
  (user: User, note: Note) => async (dispatch: Dispatch) => {
    await csrfProtectedFetch("/api/users/remove-favorite-note", {
      method: "DELETE",
      body: JSON.stringify({ user, note }),
    });
    dispatch(removeFromFavoriteNotes(note));
  };

const addCollection = (collection: Collection) => {
  return {
    type: ADD_COLLECTION,
    payload: collection,
  };
};

export const createCollection =
  (user: User, name: string, personal: boolean) =>
  async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch("/api/collections/add", {
      method: "POST",
      body: JSON.stringify({ name, user, personal }),
    });

    if (response?.ok) {
      const data = await response.json();
      dispatch(addCollection(data));
    }
  };

const removeCollection = (collection: Collection) => {
  return {
    type: REMOVE_COLLECTION,
    payload: collection.id,
  };
};

export const deleteCollection =
  (collection: Collection) => async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch("/api/collections/remove", {
      method: "DELETE",
      body: JSON.stringify({ collection }),
    });

    if (response?.ok) {
      // await response.json();
      dispatch(removeCollection(collection));
    }
  };

export const editMyCollection = (collection: Collection) => {
  return {
    type: EDIT_COLLECTION,
    payload: collection,
  };
};

const initialState = {
  id: 0,
  username: null,
  email: null,
  favorite_notes: [],
  favorite_collections: [],
  collections: [],
};

interface ArrayOfFavs {
  id: number;
}

const sessionReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return initialState;
    case ADD_FAVORITE:
      //@ts-ignore FIX LATER
      state.favorite_notes.push(action.payload);
      return { ...state };
    case REMOVE_FAVORITE:
      //@ts-ignore FIX LATER
      state.favorite_notes = state.favorite_notes.filter(
        (favs: ArrayOfFavs) => favs.id !== action.payload.id
      );
      return { ...state };
    case ADD_COLLECTION:
      //@ts-ignore FIX LATER
      state.collections = [action.payload, ...state.collections];
      return { ...state };
    case REMOVE_COLLECTION:
      state.collections = state.collections.filter(
        //@ts-ignore FIX LATER
        (col) => col.id !== action.payload
      );
      return { ...state };
    case EDIT_COLLECTION:
      state.collections = [
        //@ts-ignore FIX LATER
        action.payload,
        //@ts-ignore FIX LATER
        ...state.collections.filter((ele) => ele.id !== action.payload.id),
      ];
      return { ...state };
    default:
      return state;
  }
};

export default sessionReducer;
