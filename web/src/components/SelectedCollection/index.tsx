import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { selectCollection } from "../../store/reducers/selectedCollection";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Note {
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

interface Collection {
  id: number;
  name: string;
  notes: Note[];
}

const SelectedCollection: FC = () => {
  const collection: Collection = useAppSelector(
    (state) => state.selectedCollection
  );
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);
  const url = useLocation().pathname.split("/").slice(2);

  const [user, id] = url;
  useEffect(() => {
    setLoaded(true);
    dispatch(selectCollection(Number(id), user) as any);
  }, []);

  const render = () => {
    if (loaded) {
      if (collection.name !== "null") {
        return (
          <section>
            <h1>{collection.name}</h1>
            <div>Notes:</div>
            {collection.notes.length > 0 &&
              collection.notes.map((ele, i) => (
                <div key={i}>
                  <h4>{ele.title}</h4>
                  <div>{ele.description}</div>
                </div>
              ))}
            {collection.notes.length === 0 && (
              <div>this collection is empty</div>
            )}
          </section>
        );
      } else return <div>no collections found :( </div>;
    } else {
      return <div>loading..</div>;
    }
  };
  return render();
};

export default SelectedCollection;
