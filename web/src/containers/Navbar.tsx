import { FC, useState } from "react";
import { useAppSelector } from "../store/hooks";
import UserSessions from "../components/UserSession/index";
import SearchBar from "../components/SearchBar/index";
import { useHistory } from "react-router-dom";
import { User } from "../types";
import "./app.css";
import AddNotes from "../components/addNotes/index";
import Modal from "../components/Modal/index";

const Navbar: FC = () => {
  const user: User = useAppSelector((state) => state.session);
  const loggedIn = user.id !== 0 ? true : false;
  const history = useHistory();
  const [showCreateNote, setShowCreateNote] = useState(false);

  return (
    <nav className="nav__bar">
      <div onClick={() => history.push("/")} className="home-button">
        Sticky Code
      </div>
      <SearchBar />
      {loggedIn && (
        <button
          className="create-note-button"
          onClick={() => setShowCreateNote(true)}
        >
          Create Note
        </button>
      )}
      {showCreateNote && (
        <Modal onClose={() => setShowCreateNote(false)}>
          <AddNotes openModal={setShowCreateNote} />
        </Modal>
      )}
      <UserSessions />
    </nav>
  );
};

export default Navbar;
