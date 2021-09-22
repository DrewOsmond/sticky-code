import {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useLocation, useHistory } from "react-router-dom";
import { selectCollection } from "../../store/reducers/selectedCollection";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editCollection } from "../../store/reducers/selectedCollection";
import { deleteCollection } from "../../store/reducers/sessions";
import "./index.css";
import ContentPage from "../Content";

interface User {
  id: number | string;
  username: string;
  email: string;
  collections: Collection[];
}
interface Note {
  id: number;
  title: string;
  description: string;
  language: string;
  userId: number;
  user: User;
  comments: [];
}

interface Collection {
  id: number;
  name: string;
  notes: Note[];
  user: User;
}

const SelectedCollection: FC = () => {
  const collection: Collection = useAppSelector(
    (state) => state.selectedCollection
  );
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user: User = useAppSelector((state) => state.session);
  const url = useLocation().pathname.split("/").slice(2);
  const [username, id] = url;
  const [loaded, setLoaded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [errors, setErrors] = useState(false);

  console.log(collection);
  useEffect(() => {
    dispatch(selectCollection(Number(id), username) as any);
    setLoaded(true);
  }, []);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (editName.length <= 0) {
      return setErrors(true);
    } else {
      dispatch(editCollection(collection, editName) as any);
      setEdit(false);
    }
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    const element = e.currentTarget as HTMLInputElement;
    const id = element.id;
    let collectionToDelete: Collection | void;

    for (let collectionToRemove of user.collections) {
      if (collectionToRemove.id === collection.id) {
        collectionToDelete = collection;
        break;
      }
    }

    if (collectionToDelete) {
      dispatch(deleteCollection(collectionToDelete) as any);
      setTimeout(() => {
        history.push("/profile");
      }, 100);
    } else return;
  };

  const render = () => {
    if (loaded) {
      if (collection.name !== "null" && !edit) {
        return (
          <section>
            <h1>{collection.name}</h1>
            {user.id === collection.user.id && (
              <button
                onClick={() => {
                  setEdit(true);
                  setEditName(collection.name);
                }}
              >
                edit collection
              </button>
            )}
            <div>Notes:</div>
            <ContentPage results={collection.notes} />
            {collection.notes.length === 0 && (
              <div>this collection is empty</div>
            )}
          </section>
        );
      } else if (edit) {
        return (
          <div>
            <form onSubmit={handleSubmit}>
              {errors && <li>collection name cannot be empty</li>}
              <label htmlFor="collection__name">Collection name:</label>
              <input
                id="collection__name"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.currentTarget.value)}
              ></input>
              <button type="submit">save</button>
            </form>
            <button onClick={() => setEdit(false)}>cancel changes</button>
            <button onClick={handleDelete}>delete</button>
          </div>
        );
      } else return <div>no collections found :( </div>;
    } else {
      return <div>loading..</div>;
    }
  };
  return render();
};

export default SelectedCollection;
