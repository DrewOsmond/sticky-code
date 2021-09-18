import { FC, FormEvent, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  fetchDeleteComment,
  fetchUpdateComment,
} from "../../store/reducers/selectedNote";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Comment {
  id: number;
  description: string;
  user: User;
  userId: number;
  noteId: number;
}

interface Props {
  comment: Comment;
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
  };

  const handleSave: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!editComment) return setErrors(["comment cannot be empty"]);
    else {
      dispatch(fetchUpdateComment(comment, editComment) as any);
      setEdit(false);
    }
  };

  return (
    <div>
      {!edit && (
        <div>
          {`${comment.user.username}:  ${comment.description}`}
          {comment.user.username === sessionUser.username && (
            <button onClick={() => setEdit((prev) => !prev)}>edit</button>
          )}
        </div>
      )}
      {edit && (
        <form onSubmit={handleSave}>
          <input
            value={editComment}
            onChange={(e) => setEditComment(e.currentTarget.value)}
          ></input>
          <button type="submit">save</button>
          <button onClick={handleDelete}>delete</button>
        </form>
      )}
    </div>
  );
};

export default Comment;
