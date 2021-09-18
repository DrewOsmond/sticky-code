import React, { FC, FormEventHandler, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchAddComment } from "../../store/reducers/selectedNote";
import Edit from "../EditNotes/index";
interface Props {
  note: {
    id: number;
    title: string;
    description: string;
    language: string;
    user: {
      id: number | string;
      username: string;
      email: string;
    };
    comments: { id: string; description: string }[];
  };
}
interface SessionUser {
  id: number | string;
  username: string;
  email: string;
}

const Note: FC<Props> = ({ note }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const user: SessionUser = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return setErrors(["comment cannot be empty"]);
    else {
      dispatch(fetchAddComment(comment, note.id, Number(user.id)) as any);
      setErrors([]);
      setComment("");
    }
  };

  const render = () => {
    if (!edit) {
      return (
        <section>
          <div>{note.language}</div>
          <h3>{note.title}</h3>
          <div>By: {note.user.username}</div>
          <div>{note.description}</div>
          {user.username === note.user.username && (
            <button onClick={() => setEdit((prev) => !prev)}>Edit Note</button>
          )}
          <br />

          <form onSubmit={handleSubmit}>
            {errors.length > 0 &&
              errors.map((err, i) => <li key={i}>{err}</li>)}
            <input
              id="comment"
              placeholder="add comment"
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
            ></input>
            <button type="submit">comment</button>
          </form>
          {note.comments.map((comments) => (
            <div key={comments.id}>{comments.description}</div>
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
