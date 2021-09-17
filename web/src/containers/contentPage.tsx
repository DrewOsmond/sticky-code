import React, { MouseEventHandler, ReactElement } from "react";
import { useAppSelector } from "../store/hooks";
// import { Link } from "react-router";
interface Search {
  id: number;
  title: string;
  description: string;
}

const ContentPage = (): ReactElement => {
  const searches: Search[] = useAppSelector((state) => state.search);
  const handleClick: MouseEventHandler = (e: React.MouseEvent) => {
    const target = e.currentTarget.id;
  };
  const renderSearches = () => {
    if (searches.length === 0) return <div></div>;
    else if (typeof searches[0] === "string") return <div>{searches[0]}</div>;
    else
      return searches.map((note) => (
        <div id={`${note.id}`} key={note.id} className="search__notes">
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
