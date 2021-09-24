import { FC, FormEvent, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  fetchDeleteComment,
  fetchUpdateComment,
} from "../../store/reducers/selectedNote";
import "./index.css";
import { User, Comments } from "../../types";

interface Props {
  comment: Comments;
  sessionUser: User;
}

const Comment: FC<Props> = ({ comment, sessionUser }) => {
  const [editComment, setEditComment] = useState<string>(comment.description);
  const [errors, setErrors] = useState<string[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDelete: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchDeleteComment(comment) as any);
    setEdit(false);
    setErrors([]);
  };

  const handleSave: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!editComment) return setErrors(["comment cannot be empty"]);
    else {
      dispatch(fetchUpdateComment(comment, editComment) as any);
      setEdit(false);
      setErrors([]);
    }
  };

  return (
    <div>
      {!edit && (
        <div className="note_comments">
          <div>{comment.user.username}:</div> <div>{comment.description}</div>
          {comment.user.username === sessionUser.username && (
            <button onClick={() => setEdit((prev) => !prev)}>edit</button>
          )}
        </div>
      )}
      {edit && (
        <form onSubmit={handleSave}>
          {errors.length > 0 && errors.map((err, i) => <li key={i}>{err}</li>)}
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.currentTarget.value)}
          ></textarea>
          <button type="submit">save</button>
          <button onClick={handleDelete}>delete</button>
        </form>
      )}
    </div>
  );
};

export default Comment;
