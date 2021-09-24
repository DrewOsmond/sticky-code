import { useParams } from "react-router-dom";
import { fetchNote } from "../store/reducers/selectedNote";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import SelectedNote from "../components/Note";
import { Notes } from "../types";

const Note = () => {
  const dispatch = useAppDispatch();
  const note: Notes = useAppSelector((state) => state.selectedNote);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const numberId = Number(id);
    dispatch(fetchNote(numberId) as any);
    setTimeout(() => {
      setLoaded(true);
    }, 50);
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
