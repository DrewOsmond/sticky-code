import { useParams } from "react-router-dom";
import { fetchNote } from "../store/reducers/selectedNote";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import SelectedNote from "../components/SelectedNote";

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
  comments: [];
}

const Note = () => {
  const dispatch = useAppDispatch();
  const note: Notes = useAppSelector((state) => state.selectedNote);
  const [loaded, setLoaded] = useState<boolean>(false);
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
        <section>
          <SelectedNote note={note} />
        </section>
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
