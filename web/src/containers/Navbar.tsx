import { FC, FormEventHandler, useState } from "react";
import { useAppSelector } from "../store/hooks";
import UserSessions from "../components/UserSession/UserSessions";
import SearchBar from "../components/SearchBar/SearchBar";
import AddNotes from "../components/addNotes/AddNotes";
interface SessionUser {
  user: {
    id: number | string;
    username: string;
    email: string;
  };
}

const Navbar: FC = () => {
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const session: SessionUser = useAppSelector((state) => state.session);
  const user = session.user;
  const loggedIn = user.id ? true : false;

  const handleChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowStatus((prev) => !prev);
  };

  return (
    <nav>
      <UserSessions loggedIn={loggedIn} user={user} />
      <SearchBar />
      {loggedIn && <button onClick={handleChange}>Create Note</button>}
      {showStatus && <AddNotes />}
    </nav>
  );
};

export default Navbar;
