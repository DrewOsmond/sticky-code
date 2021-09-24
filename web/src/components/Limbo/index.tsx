import { useAppSelector } from "../../store/hooks";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

const Limbo = () => {
  const selectedNote: { id: number } = useAppSelector(
    (state) => state.selectedNote
  );
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (loaded) {
    if (selectedNote.id === 0) history.push("/");
    else history.push(`/note/${selectedNote.id}`);
  }
  return <div>loading...</div>;
};

export default Limbo;
