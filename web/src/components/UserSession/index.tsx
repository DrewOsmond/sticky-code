import {
  ReactElement,
  useState,
  FC,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import Login from "../login";
import Signup from "../signup";
import { useAppSelector } from "../../store/hooks";
import { useHistory } from "react-router";
import "./index.css";
import Modal from "../Modal";
import { User } from "../../types";

const UserSessions: FC = (): ReactElement => {
  const user: User = useAppSelector((state) => state.session);
  const [showStatus, setShowStatus] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const credentials = { username, email, password, confirmPassword };
  const history = useHistory();

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
    <>
      {user.id === 0 && (
        <button id="login" onClick={changeStatus} className="login">
          login || signup
        </button>
      )}

      {user.id === 0 && showStatus === "login" && (
        <Modal onClose={() => setShowStatus("")}>
          <Login
            handleChange={handleChange}
            credentials={credentials}
            clearResults={clearResults}
            changeStatus={changeStatus}
          />
        </Modal>
      )}

      {user.id === 0 && showStatus === "signup" && (
        <Modal onClose={() => setShowStatus("")}>
          <Signup
            handleChange={handleChange}
            credentials={credentials}
            clearResults={clearResults}
            changeStatus={changeStatus}
          />
        </Modal>
      )}

      {user.id !== 0 && (
        <button
          onClick={() => history.push("/profile")}
          className="profile-button"
        >
          {`<${user.username} />`}
        </button>
      )}
    </>
  );
};

export default UserSessions;
