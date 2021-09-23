import { FC } from "react";
import { useAppSelector } from "../store/hooks";
import UserSessions from "../components/UserSession";
import SearchBar from "../components/SearchBar";
import { useHistory } from "react-router-dom";
import "./index.css";
interface SessionUser {
  id: number | string;
  username: string;
  email: string;
}

const Navbar: FC = () => {
  const user: SessionUser = useAppSelector((state) => state.session);
  const loggedIn = user.id !== 0 ? true : false;
  const history = useHistory();

  return (
    <nav className="nav__bar">
      <button onClick={() => history.push("/")}>home</button>
      <SearchBar />
      {loggedIn && (
        <button onClick={() => history.push("/add-note")}>Create Note</button>
      )}
      <UserSessions />
    </nav>
  );
};

export default Navbar;
