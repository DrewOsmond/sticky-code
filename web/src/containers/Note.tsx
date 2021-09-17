import { useParams } from "react-router-dom";
import { fetchNote } from "../store/reducers/notes";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import SelectedNote from "../components/SelectedNote";

interface Notes {
  id: number;
  title: string;
  description: string;
  language: string;
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
        <>
          <SelectedNote note={note} />
        </>
      );
    } else if (loaded) {
      return <div>No notes found</div>;
    } else {
      return <div>loading...</div>;
    }
  };

  return render();
};

export default Note;
