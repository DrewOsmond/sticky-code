import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useHistory } from "react-router-dom";
import ContentPage from "../content/index";
import { logout } from "../../store/reducers/sessions";
import { MouseEventHandler } from "react";
import { User } from "../../types";
import "./index.css";

const Profie = () => {
  const user: User = useAppSelector((state) => state.session);
  const { username } = user;
  const dispatch = useAppDispatch();
  const history = useHistory();

  const signout: MouseEventHandler = () => {
    dispatch(logout() as any);
    setTimeout(() => {
      history.push("/");
    }, 50);
  };

  return (
    <section className="user-profile">
      {user.id !== 0 && (
        <button className="logout-btn" onClick={signout}>
          logout( )
        </button>
      )}
      <h2>{username}</h2>
      {user.collections.length > 0 ? (
        <p>Your collections:</p>
      ) : (
        <p>you haven't created a collection of notes yet!</p>
      )}
      {user.collections.length > 0 &&
        user.collections.map((val) => (
          <div key={val.id}>
            {val.name + "  "}
            <button
              onClick={() => history.push(`/collection/${username}/${val.id}`)}
            >
              go to collection
            </button>
          </div>
        ))}
      {user.favorite_notes.length > 0 ? (
        <p>Your favorited notes:</p>
      ) : (
        <p>you haven't favorited any notes yet!</p>
      )}
      {user.favorite_notes.length > 0 && (
        <ContentPage results={user.favorite_notes} />
      )}
    </section>
  );
};

export default Profie;
