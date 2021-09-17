import { FC, FormEventHandler, useState } from "react";
import { useAppSelector } from "../store/hooks";
import UserSessions from "../components/UserSession";
import SearchBar from "../components/SearchBar";
import AddNotes from "../components/AddNotes";
import { useHistory } from "react-router-dom";
interface SessionUser {
  id: number | string;
  username: string;
  email: string;
}

const Navbar: FC = () => {
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const user: SessionUser = useAppSelector((state) => state.session);
  const loggedIn = user.id ? true : false;
  const history = useHistory();

  const handleChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowStatus((prev) => !prev);
  };

  return (
    <nav>
      <button onClick={() => history.push("/")}>home</button>
      <SearchBar />
      {loggedIn && <button onClick={handleChange}>Create Note</button>}
      {showStatus && <AddNotes />}
      <UserSessions loggedIn={loggedIn} user={user} />
    </nav>
  );
};

export default Navbar;
