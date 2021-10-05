import { FC, FormEvent, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  fetchDeleteComment,
  fetchUpdateComment,
} from "../../store/reducers/selectedNote";
import "./index.css";
import { User, Comments } from "../../types";
import { useHistory } from "react-router-dom";

interface Props {
  comment: Comments;
  sessionUser: User;
}

const Comment: FC<Props> = ({ comment, sessionUser }) => {
  const [editComment, setEditComment] = useState<string>(comment.description);
  const [errors, setErrors] = useState<string[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

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
          <div className="comment-user-info">
            {comment.user.username === sessionUser.username && (
              <button
                onClick={() => setEdit((prev) => !prev)}
                className="comment-edit-btn"
              >
                edit
              </button>
            )}
            <div
              className="comment-user"
              onClick={() => history.push(`/profile/${comment.user.username}`)}
            >
              @{comment.user.username}
            </div>
            <div className="comment-description">{comment.description}</div>
          </div>
        </div>
      )}
      {edit && (
        <form onSubmit={handleSave} className="edit-comment-form">
          {errors.length > 0 && errors.map((err, i) => <li key={i}>{err}</li>)}
          <textarea
            value={editComment}
            onChange={(e) => setEditComment(e.currentTarget.value)}
            className="edit-comment-textarea"
          ></textarea>
          <button onClick={handleDelete} className="delete-comment-btn">
            delete
          </button>
          <button type="submit" className="save-comment-btn">
            save
          </button>
        </form>
      )}
    </div>
  );
};

export default Comment;
