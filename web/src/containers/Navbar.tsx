import { FC } from "react";
import { useAppSelector } from "../store/hooks";
import UserSessions from "../components/UserSession";
import SearchBar from "../components/SearchBar";
import { useHistory } from "react-router-dom";
import { User } from "../types";
import "./app.css";

const Navbar: FC = () => {
  const user: User = useAppSelector((state) => state.session);
  const loggedIn = user.id !== 0 ? true : false;
  const history = useHistory();

  return (
    <nav className="nav__bar">
      <div onClick={() => history.push("/")} className="home-button">
        {`( ) => Home`}
      </div>
      <SearchBar />
      {loggedIn && (
        <button
          className="create-note-button"
          onClick={() => history.push("/add-note")}
        >{`{ Create Note }`}</button>
      )}
      <UserSessions />
    </nav>
  );
};

export default Navbar;
