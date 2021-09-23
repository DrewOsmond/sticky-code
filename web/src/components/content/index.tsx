import { FC, MouseEventHandler, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

interface Results {
  id: number;
  title: string;
  description?: string;
}

interface Props {
  results: Results[];
}

const ContentPage: FC<Props> = ({ results }): ReactElement => {
  const history = useHistory();

  const handleClick: MouseEventHandler = (e: React.MouseEvent) =>
    history.push(`/note/${e.currentTarget.id}`);

  const renderSearches = () => {
    if (results.length === 0) return <div></div>;
    else if (typeof results[0] === "string") return <div>{results[0]}</div>;
    else
      return results.map((note: Results) => (
        <div
          id={`${note.id}`}
          key={note.id}
          className="notes"
          onClick={handleClick}
        > 
          <h5 className="note-title">{note.title}</h5>
          <div className="note-description">{note.description}</div>
        </div>
      ));
  };

  return <section>{renderSearches()}</section>;
};

export default ContentPage;
