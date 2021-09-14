import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import UserSessions from "./UserSessions";

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

  return (
    <nav>
      <UserSessions loggedIn={loggedIn} user={user} />
    </nav>
  );
};

export default Navbar;
