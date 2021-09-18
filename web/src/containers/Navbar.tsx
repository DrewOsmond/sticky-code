import { FC, MouseEventHandler } from "react";
import { useAppSelector } from "../store/hooks";
import UserSessions from "../components/UserSession";
import SearchBar from "../components/SearchBar";
import { useHistory } from "react-router-dom";
interface SessionUser {
  id: number | string;
  username: string;
  email: string;
}

const Navbar: FC = () => {
  const user: SessionUser = useAppSelector((state) => state.session);
  const loggedIn = user.id ? true : false;
  const history = useHistory();

  return (
    <nav>
      <button onClick={() => history.push("/")}>home</button>
      <SearchBar />
      {loggedIn && (
        <button onClick={() => history.push("/add-note")}>Create Note</button>
      )}
      <UserSessions loggedIn={loggedIn} user={user} />
    </nav>
  );
};

export default Navbar;
