import { MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteCollection } from "../store/reducers/sessions";
import { useHistory } from "react-router-dom";
interface Collection {
  id: number;
  name: string;
}
interface User {
  id: number;
  username: string;
  email: string;
  favorites: unknown[];
  collections: Collection[];
}

interface Note {
  id: number;
  category: string;
}

const Profie = () => {
  const user: User = useAppSelector((state) => state.session);
  const { username } = user;
  const dispatch = useAppDispatch();
  const history = useHistory();
  console.log(user);
  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    const element = e.currentTarget as HTMLInputElement;
    const id = element.id;
    let collectionToDelete: Collection | void;

    for (let collection of user.collections) {
      if (collection.id === Number(id)) {
        collectionToDelete = collection;
        break;
      }
    }

    if (collectionToDelete) {
      dispatch(deleteCollection(collectionToDelete) as any);
    } else return;
  };

  return (
    <section>
      <h2>{username}</h2>
      {user.collections.length > 0 &&
        user.collections.map((val) => (
          <div key={val.id}>
            {val.name + "  "}
            {/* <button id={`${val.id}`}>edit</button>
            <button id={`${val.id}`} onClick={handleDelete}>
              delete
            </button> */}
            <button
              onClick={() => history.push(`/collection/${username}/${val.id}`)}
            >
              go to collection
            </button>
          </div>
        ))}
    </section>
  );
};

export default Profie;
