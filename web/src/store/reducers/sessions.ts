import { Dispatch } from "redux";
import { csrfProtectedFetch } from "../csrfProtection";

interface Action {
  type: string;
  payload: {
    user: string;
  };
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

const LOGIN_USER = "sessions/setUser";
const LOGOUT_USER = "session/logoutUser";

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

export const login =
  (user: userLogin) => async (dispatch: Dispatch<Action>) => {
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
      dispatch(loginUser(userData.user) as any);
      return response;
    }
  };

export const restore = () => async (dispatch: Dispatch<Action>) => {
  const response = await csrfProtectedFetch("/api/users/restore");
  if (response?.ok) {
    const userData = await response?.json();
    dispatch(loginUser(userData) as any);
  }
};

const initialState = { user: { id: null, username: null, email: null } };

const sessionReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
