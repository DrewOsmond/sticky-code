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
import Edit from "../EditNotes/index";
import Comment from "../Comments/index";
import "./index.css";

interface Props {
  note: {
    id: number;
    title: string;
    description: string;
    language: string;
    user: {
      id: number;
      username: string;
      email: string;
      favorite_notes: { id: number }[];
      favorite_collections: { id: number }[];
    };
    comments: { id: string; description: string; user: User }[];
  };
}
interface User {
  id: number;
  username: string;
  email: string;
  favorite_notes: { id: number }[];
  favorite_collections: { id: number }[];
}

const Note: FC<Props> = ({ note }) => {
  const user: User = useAppSelector((state) => state.session);
  const notez = useAppSelector((state) => state.selectedNote);
  const [edit, setEdit] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return setErrors(["comment cannot be empty"]);
    else {
      dispatch(fetchAddComment(comment, note.id, user) as any);
      setErrors([]);
      setComment("");
    }
  };

  const handleAddFavorite: MouseEventHandler = () =>
    dispatch(addFavoriteNote(user, note) as any);

  const handleRemoveFavorite: MouseEventHandler = () =>
    dispatch(removeFavoriteNote(user, note) as any);

  const isFavorite = () => {
    if (!user.username && user.favorite_notes.length <= 0) return <div></div>;
    for (let favorite of user.favorite_notes) {
      if (favorite.id === note.id) {
        return <button onClick={handleRemoveFavorite}>unfavorite</button>;
      }
    }
    return <button onClick={handleAddFavorite}>favorite</button>;
  };

  const render = () => {
    if (!edit) {
      return (
        <section>
          <div className="selected_note">
            <div>
              by: <span className="bold">{note.user.username}</span>
            </div>
            <div>
              language: <span className="bold">{note.language}</span>
            </div>
            <h3>{note.title}</h3>
            <div>{note.description}</div>
          </div>
          {user.username === note.user.username && (
            <button onClick={() => setEdit((prev) => !prev)}>Edit Note</button>
          )}
          {user.username !== note.user.username && isFavorite()}
          <br />

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

          {note.comments.length > 0 &&
            note.comments.map((comment) => (
              <Comment
                comment={comment as any}
                sessionUser={user}
                key={comment.id}
              />
            ))}
        </section>
      );
    } else {
      return <Edit note={note} setEdit={setEdit} />;
    }
  };

  return render();
};

export default Note;
