import { ReactElement } from "react";
import { useAppSelector } from "../store/hooks";

interface Search {
  id: number;
  title: string;
  description: string;
}

const ContentPage = (): ReactElement => {
  const searches: Search[] = useAppSelector((state) => state.search);

  const renderSearches = () => {
    if (searches.length === 0) return <div></div>;
    else if (typeof searches[0] === "string") return <div>{searches[0]}</div>;
    else
      return searches.map((note) => (
        <div key={note.id}>
          <div>{note.title}</div>
          <br />
          <div>{note.description}</div>
          <br />
        </div>
      ));
  };

  return <section>{renderSearches()}</section>;
};

export default ContentPage;
