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
  user: {
    id: number;
    username: string;
    email: string;
    favorite_notes: { id: number }[];
    favorite_collections: { id: number }[];
  };
  comments: [];
}

const Note = () => {
  const dispatch = useAppDispatch();
  const note: Notes = useAppSelector((state) => state.selectedNote);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { id } = useParams<{ id?: string }>();
  console.log(note);

  useEffect(() => {
    console.log("we get here how often?");
    const numberId = Number(id);
    dispatch(fetchNote(numberId) as any);
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
