import { useAppSelector } from "../store/hooks";
import { useHistory } from "react-router-dom";
import ContentPage from "../components/Content";
interface Collection {
  id: number;
  name: string;
}
interface User {
  id: number;
  username: string;
  email: string;
  favorite_notes: Note[];
  favorite_collections: Collection[];
  collections: Collection[];
}

interface Note {
  id: number;
  category: string;
  title: string;
}

const Profie = () => {
  const user: User = useAppSelector((state) => state.session);
  const { username } = user;
  const history = useHistory();

  console.log(user);
  return (
    <section>
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
      {user.favorite_collections.length > 0 ? (
        <p>Your favorite collections:</p>
      ) : (
        <p>you haven't favorited any collections yet!</p>
      )}
      {user.favorite_collections.length > 0 &&
        user.favorite_collections.map((val) => (
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
