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
          <div>
            <div className="note-language">
              {" "}
              language:{" "}
              <span className="note-language-em">{note.language}</span>{" "}
            </div>
            <div className="note-title">{note.title}</div>
          </div>
          <div className="note-description">{note.description}</div>
        </div>
      ));
  };

  return <section className="">{renderSearches()}</section>;
};

export default ContentPage;
