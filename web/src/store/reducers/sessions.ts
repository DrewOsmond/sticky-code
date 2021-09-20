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

interface UserSignup {
  username: string;
  email: string;
  password: string;
}

interface userLogin {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  favorites: any[];
}

const LOGIN_USER = "session/setUser";
const LOGOUT_USER = "session/logoutUser";
const ADD_FAVORITE = "session/addFavorite";
const REMOVE_FAVORITE = "session/removeFavorite";

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

export const signup = (user: UserSignup) => async (dispatch: Dispatch) => {
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

export const login = (user: userLogin) => async (dispatch: Dispatch) => {
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

const addToFavorites = (note: Note) => {
  return {
    type: ADD_FAVORITE,
    payload: note,
  };
};

export const addFavorites =
  (user: User, note: Note) => async (dispatch: Dispatch) => {
    const response = await csrfProtectedFetch("/api/users/add-favorite", {
      method: "POST",
      body: JSON.stringify({ user, note }),
    });
    if (response?.ok) {
      dispatch(addToFavorites(note));
    }
  };

const removeFromFavorites = (note: Note) => {
  return {
    type: REMOVE_FAVORITE,
    payload: note,
  };
};

export const removeFavorites =
  (user: User, note: Note) => async (dispatch: Dispatch) => {
    await csrfProtectedFetch("/api/users/remove-favorite", {
      method: "DELETE",
      body: JSON.stringify({ user, note }),
    });
    dispatch(removeFromFavorites(note));
  };

const initialState = { id: null, username: null, email: null, favorites: [] };

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
      state.favorites.push(action.payload);
      return { ...state };
    case REMOVE_FAVORITE:
      //@ts-ignore FIX LATER
      state.favorites = state.favorites.filter(
        (favs: ArrayOfFavs) => favs.id !== action.payload.id
      );
      return { ...state };
    default:
      return state;
  }
};

export default sessionReducer;
