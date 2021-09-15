import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import UserSessions from "../components/UserSession/UserSessions";
import { getAllLanguages } from "../store/reducers/languages";
import SearchBar from "../components/SearchBar/SearchBar";
interface SessionUser {
  user: {
    id: number | string;
    username: string;
    email: string;
  };
}

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const session: SessionUser = useAppSelector((state) => state.session);
  const user = session.user;
  const loggedIn = user.id ? true : false;
  const languages: [{ id: number; name: string }] = useAppSelector(
    (state) => state.languages
  );

  useEffect(() => {
    dispatch(getAllLanguages() as any);
  }, []);

  return (
    <nav>
      <UserSessions loggedIn={loggedIn} user={user} />
      <SearchBar languages={languages} />
    </nav>
  );
};

export default Navbar;
