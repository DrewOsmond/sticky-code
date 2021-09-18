import { FC, useState, FormEventHandler } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchUpdateNote } from "../../store/reducers/selectedNote";
import { deleteNote } from "../../store/reducers/notes";
import { useHistory } from "react-router-dom";

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
  };
  setEdit: Function;
}

const Edit: FC<Props> = ({ note, setEdit }) => {
  const [title, setTitle] = useState<string>(note.title);
  const [description, setDescription] = useState<string>(note.description);
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!title) errors.push("Tile cannot be empty");
    if (!description) errors.push("Description cannot be empty");
    if (errors.length) setErrors(errors);
    else {
      setErrors([]);
      if (title !== note.title || description !== note.description) {
        dispatch(fetchUpdateNote(note, title, description) as any);
      }
      setEdit((prev: boolean) => !prev);
    }
  };

  const handleDelete = () => {
    dispatch(deleteNote(note) as any);
    setTimeout(() => {
      history.push("/");
    }, 100);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 &&
          errors.map((error, i) => <li key={i}>{error}</li>)}
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br />
        <textarea
          value={description}
          placeholder="Add your note"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={() => setEdit((prev: boolean) => !prev)}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default Edit;
