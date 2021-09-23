import {
  ReactElement,
  useState,
  FC,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import { logout } from "../../store/reducers/sessions";
import Login from "../login";
import Signup from "../signup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useHistory } from "react-router";

interface User {
  id: number | string;
  username: string;
  email: string;
}

const UserSessions: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector((state) => state.session);
  const [showStatus, setShowStatus] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const credentials = { username, email, password, confirmPassword };
  const history = useHistory();

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
      {user.id === 0 && (
        <>
          <button id="login" onClick={changeStatus}>
            login
          </button>
          <button id="signup" onClick={changeStatus}>
            signup
          </button>
        </>
      )}

      {user.id !== 0 && <button onClick={signout}>logout</button>}

      {user.id !== 0 && <div>{`welcome, ${user.username}`}</div>}

      {user.id !== 0 && (
        <button onClick={() => history.push("/profile")}>profile</button>
      )}

      {user.id === 0 && showStatus === "login" && (
        <Login
          handleChange={handleChange}
          credentials={credentials}
          clearResults={clearResults}
        />
      )}

      {user.id === 0 && showStatus === "signup" && (
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
