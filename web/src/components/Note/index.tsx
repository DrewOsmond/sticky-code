import React, {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchAddComment } from "../../store/reducers/selectedNote";
import {
  addFavoriteNote,
  removeFavoriteNote,
} from "../../store/reducers/sessions";
import { csrfProtectedFetch } from "../../store/csrfProtection";
import Edit from "../EditNotes/index";
import Comment from "../Comments/index";
import AddCollection from "../addCollection";
import "./index.css";
import { useHistory } from "react-router";
import { Notes, User } from "../../types";
import Modal from "../Modal";

interface Props {
  note: Notes;
}

const SelectedNote: FC<Props> = ({ note }) => {
  const user: User = useAppSelector((state) => state.session);
  const history = useHistory();
  const [edit, setEdit] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [collectionErrors, setCollectionErrors] = useState("");
  const [collection, setCollection] = useState<string>("");
  const [added, setAdded] = useState(false);
  const [showAllCommenters, setShowAllCommenters] = useState(false);
  const dispatch = useAppDispatch();
  const userComments = note.comments.map((com) => com.user.username);
  const uniqueCommentsSet: Set<string> = new Set(userComments);
  const uniqueUserComments: string[] = Array.from(uniqueCommentsSet);

  const handleSubmit: FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return setErrors(["comment cannot be empty"]);
    else {
      dispatch(fetchAddComment(comment, note.id /*, user*/) as any);
      setErrors([]);
      setComment("");
    }
  };

  const handleAddFavorite: MouseEventHandler = () =>
    dispatch(addFavoriteNote(note) as any);

  const handleRemoveFavorite: MouseEventHandler = () =>
    dispatch(removeFavoriteNote(note) as any);

  const handleCollectionChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "select a collection") {
      setCollection("");
    } else {
      setCollection(e.target.value);
    }
  };

  const addNoteToCollection: MouseEventHandler = async () => {
    if (!collection || collection === "0") {
      return setCollectionErrors("please select a collection");
    } else {
      const collectionId = user.collections.filter(
        (ele) => ele.id === Number(collection)
      );
      const response = await csrfProtectedFetch("/api/collections/add-note", {
        method: "POST",
        body: JSON.stringify({ collection: collectionId[0], note }),
      });
      if (response?.ok) {
        setAdded(true);
        setTimeout(() => {
          setAdded(false);
        }, 2000);
      }
    }
  };

  const isFavorite = () => {
    if (!user.id) return;
    if (!user.username && user.favorite_notes.length <= 0) return <div></div>;
    for (let favorite of user.favorite_notes) {
      if (favorite.id === note.id) {
        return <button onClick={handleRemoveFavorite}>unfavorite</button>;
      }
    }
    return <button onClick={handleAddFavorite}>favorite</button>;
  };

  const generateRecentComments = () => {
    if (note.comments.length === 0) {
      return <div>it looks empty in here...</div>;
    }

    if (uniqueUserComments.length < 3) {
      return (
        <div>
          {uniqueUserComments.length > 1
            ? `${note.comments.length} replies from ${uniqueUserComments[0]} and ${uniqueUserComments[1]}`
            : `${note.comments.length} ${
                note.comments.length > 1 ? "replies" : "reply"
              } from ${uniqueUserComments[0]}`}
        </div>
      );
    } else {
      return (
        <div>
          {`${note.comments.length} replies from ${uniqueUserComments[0]}, ${
            uniqueUserComments[1]
          }, and ${uniqueUserComments.length - 2} `}
          <span
            className="more-replies"
            onClick={() => setShowAllCommenters(true)}
          >
            more...
          </span>
        </div>
      );
    }
  };

  const handleProfileRedirect: MouseEventHandler = () => {
    history.push(`/profile/${note.user.username}`);
  };
  console.log(uniqueUserComments);
  return (
    <div>
      {edit && (
        <Modal onClose={() => setEdit(false)}>
          <Edit note={note} setEdit={setEdit} />
        </Modal>
      )}
      {showAllCommenters && (
        <Modal onClose={() => setShowAllCommenters(false)}>
          <div className="all-commenters">
            {uniqueUserComments.map((user, i) => (
              <div key={i}>{user}</div>
            ))}
          </div>
        </Modal>
      )}
      <div className="note-flex">
        <div className="selected_note">
          {user.username === note.user.username && (
            <button
              className="edit-button"
              onClick={() => setEdit((prev) => !prev)}
            >
              edit note
            </button>
          )}
          <div>
            by:{" "}
            <span className="postUser">
              <button onClick={handleProfileRedirect}>
                {`@${note.user.username}`}
              </button>
            </span>
          </div>
          <div>
            language: <span className="bold">{note.language}</span>
          </div>
          <h3>{note.title}</h3>
          <div>{note.description}</div>
        </div>
      </div>
      {user.username !== note.user.username && isFavorite()}
      <br />
      {collection === "add collection" && (
        <AddCollection user={user} setCollection={setCollection} />
      )}
      {added && <div>successfully added</div>}
      {user.id !== 0 && (
        <select onChange={handleCollectionChange} value={collection}>
          <option value="select collection" id={"0"}>
            select collection
          </option>
          <option value="add collection" id={"0"}>
            add collection
          </option>
          {user.collections.map((ele) => (
            <option key={ele.id} value={ele.id} id={`${ele.id}`}>
              {ele.name}
            </option>
          ))}
        </select>
      )}
      {collectionErrors.length > 0 && <li>{collectionErrors}</li>}
      {user.id !== 0 && (
        <button onClick={addNoteToCollection}>add to collection</button>
      )}
      {user.id !== 0 && (
        <form onSubmit={handleSubmit}>
          {edit &&
            errors.length > 0 &&
            errors.map((err, i) => <li key={i}>{err}</li>)}
          <textarea
            id="comment"
            placeholder="add comment"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          ></textarea>
          <button type="submit">comment</button>
        </form>
      )}
      {generateRecentComments()}
      {note.comments.length > 0 &&
        note.comments.map((comment) => (
          <Comment
            comment={comment as any}
            sessionUser={user}
            key={comment.id}
          />
        ))}
    </div>
  );
};

export default SelectedNote;
