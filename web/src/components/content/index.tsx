import { FC, MouseEventHandler, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
import { Notes } from "../../types";

interface Props {
  results: Notes[];
}

const ContentPage: FC<Props> = ({ results }): ReactElement => {
  const history = useHistory();

  const handleClick: MouseEventHandler = (e: React.MouseEvent) =>
    history.push(`/note/${e.currentTarget.id}`);

  const renderSearches = () => {
    if (results.length === 0) return <div></div>;
    else if (typeof results[0] === "string") return <div>{results[0]}</div>;
    else
      return results.map((note: Notes) => (
        <div
          id={`${note.id}`}
          key={note.id}
          className="notes"
          onClick={handleClick}
        >
          <h5 className="note-title">{note.title}</h5>
          {console.log(note)}
        </div>
      ));
  };

  return <section>{renderSearches()}</section>;
};

export default ContentPage;
