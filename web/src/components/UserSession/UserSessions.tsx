import {
  ReactElement,
  useState,
  FC,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import { logout } from "../../store/reducers/sessions";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import { useAppDispatch } from "../../store/hooks";

interface LoggedInProps {
  loggedIn: boolean;
  user: {
    id: number | string;
    username: string;
    email: string;
  };
}

const UserSessions: FC<LoggedInProps> = ({ loggedIn, user }): ReactElement => {
  const dispatch = useAppDispatch();
  const [showStatus, setShowStatus] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const credentials = { username, email, password, confirmPassword };

  const signout: MouseEventHandler = () => {
    dispatch(logout() as any);
    clearResults();
  };

  const clearResults = () => {
    const values = [
      setShowStatus,
      setUsername,
      setEmail,
      setPassword,
      setConfirmPassword,
    ];
    for (let valueToClear of values) valueToClear("");
  };

  const handleChange: ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (e.target.id) {
      case "username":
        return setUsername(e.target.value);
      case "email":
        return setEmail(e.target.value);
      case "password":
        return setPassword(e.target.value);
      case "confirm_password":
        return setConfirmPassword(e.target.value);
      default:
        return;
    }
  };

  const changeStatus: MouseEventHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const target = e.target as Element;
    if (target.id === showStatus) setShowStatus("");
    else setShowStatus(target.id);
  };

  return (
    <nav>
      {!loggedIn && (
        <>
          <button id="login" onClick={changeStatus}>
            login
          </button>
          <button id="signup" onClick={changeStatus}>
            signup
          </button>
        </>
      )}

      {loggedIn && <button onClick={signout}>logout</button>}

      {loggedIn && <div>{`welcome, ${user.username}`}</div>}

      {!loggedIn && showStatus === "login" && (
        <Login
          handleChange={handleChange}
          credentials={credentials}
          clearResults={clearResults}
        />
      )}

      {!loggedIn && showStatus === "signup" && (
        <Signup
          handleChange={handleChange}
          credentials={credentials}
          clearResults={clearResults}
        />
      )}
    </nav>
  );
};

export default UserSessions;
