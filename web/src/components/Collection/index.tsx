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
import { deleteNote } from "../../store/reducers/notes";
import {
  deleteFromCollection,
  deletePersonalNoteFromCollection,
} from "../../store/reducers/selectedCollection";
import { User, Notes, Collection } from "../../types";

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
  const [personal, setPersonal] = useState(
    collection.personal === true ? "private" : "public"
  );

  useEffect(() => {
    dispatch(selectCollection(Number(id), username) as any);
    setLoaded(true);
    setTimeout(() => {
      setPersonal(collection.personal === true ? "private" : "public");
    }, 100);
  }, []);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (editName.length <= 0) {
      return setErrors(true);
    } else {
      dispatch(editCollection(collection, editName, personal) as any);
      setEdit(false);
    }
  };

  const handleDeleteCollection: MouseEventHandler<HTMLButtonElement> = (e) => {
    let collectionToDelete: Collection | void;

    for (let collectionToRemove of user.collections) {
      if (collectionToRemove.id === collection.id) {
        collectionToDelete = collection;
        break;
      }
    }

    if (collectionToDelete) {
      dispatch(deleteCollection(collectionToDelete) as any);
      setTimeout(() => [history.push("/profile")], 100);
    } else return;
  };

  const handleDeleteNote: MouseEventHandler<HTMLButtonElement> = (e) => {
    const noteIdToRemove = Number(e.currentTarget.id);
    const noteToRemove: Notes[] = collection.notes
      .concat(collection.added_notes)
      .filter((note: Notes) => note.id === noteIdToRemove);

    if (noteToRemove.length > 0) {
      dispatch(deleteNote(noteToRemove[0]) as any);
      dispatch(deletePersonalNoteFromCollection(noteToRemove[0].id) as any);
    }
  };

  const handleDeleteFromCollection: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    const noteIdToRemove = Number(e.currentTarget.id);
    const noteToRemove: Notes[] = collection.notes
      .concat(collection.added_notes)
      .filter((note: Notes) => note.id === noteIdToRemove);
    dispatch(deleteFromCollection(collection, noteToRemove[0]) as any);
  };

  const handleClick: MouseEventHandler = (e: React.MouseEvent) =>
    history.push(`/note/${e.currentTarget.id}`);
  const render = () => {
    if (loaded) {
      if (collection.id !== 0 && !edit) {
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
            {(collection.notes.length > 0 ||
              collection.added_notes.length > 0) &&
              collection.notes
                .concat(collection.added_notes)
                .map((note: Notes) => (
                  <div className="search__notes">
                    {note.user.id === user.id &&
                    note.collection.id === collection.id ? (
                      <button
                        id={`${note.id}`}
                        onClick={(e) => {
                          handleDeleteNote(e);
                          handleDeleteFromCollection(e);
                        }}
                      >
                        delete note
                      </button>
                    ) : (
                      <button
                        id={`${note.id}`}
                        onClick={handleDeleteFromCollection}
                      >
                        delete from collection
                      </button>
                    )}
                    <div id={`${note.id}`} key={note.id} onClick={handleClick}>
                      <h3>{note.title}</h3>
                      <br />
                      <div>{note.description}</div>
                    </div>
                  </div>
                ))}
            {collection.notes.concat(collection.added_notes).length === 0 && (
              <div>this collection is empty</div>
            )}
          </section>
        );
      } else if (collection.name === "loading") {
        return <div>loading...</div>;
      } else if (edit) {
        //change this so it is it's own component so it can properly refresh

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
              <input
                type="radio"
                id="public"
                value="public"
                name="public collections"
                checked={personal === "public"}
                onChange={(e) =>
                  setPersonal(
                    e.currentTarget.id !== personal
                      ? "public"
                      : e.currentTarget.id
                  )
                }
              />{" "}
              public collection
              <input
                type="radio"
                id="private"
                value="private"
                name="private collection"
                checked={personal === "private"}
                onChange={(e) =>
                  setPersonal(
                    e.currentTarget.id !== personal
                      ? "private"
                      : e.currentTarget.id
                  )
                }
              />
              private collection
              <button type="submit">save</button>
            </form>
            <button onClick={() => setEdit(false)}>cancel changes</button>
            <button onClick={handleDeleteCollection}>delete</button>
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
