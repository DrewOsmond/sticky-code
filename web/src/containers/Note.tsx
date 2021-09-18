import { useParams } from "react-router-dom";
import { fetchNote } from "../store/reducers/notes";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import SelectedNote from "../components/SelectedNote";
import Edit from "../components/EditNotes";

interface Notes {
  id: number;
  title: string;
  description: string;
  language: string;
  userId: number;
  user: {
    id: number | string;
    username: string;
    email: string;
  };
}

interface SessionUser {
  id: number | string;
  username: string;
  email: string;
}

const Note = () => {
  const dispatch = useAppDispatch();
  const note: Notes = useAppSelector((state) => state.selectedNote);
  const user: SessionUser = useAppSelector((state) => state.session);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const numberId = Number(id);
    if (!isNaN(numberId)) {
      dispatch(fetchNote(Number(id)) as any);
    }
    setLoaded(true);
  }, []);

  const render = () => {
    if (loaded && note.id !== 0) {
      return (
        <>
          {!edit && <SelectedNote note={note} />}
          {edit && <Edit note={note} setEdit={setEdit} />}
          {user.username === note.user.username && !edit && (
            <button onClick={() => setEdit(true)}>Edit</button>
          )}
        </>
      );
    } else if (loaded) {
      return <div>No notes found</div>;
    } else {
      return <div>loading...</div>;
    }
  };

  return <section>{render()}</section>;
};

export default Note;
