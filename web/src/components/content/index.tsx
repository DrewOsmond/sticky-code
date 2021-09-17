import { FC, MouseEventHandler, ReactElement } from "react";
import { useHistory } from "react-router-dom";
interface Results {
  id: number;
  title: string;
  description: string;
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
        <section
          id={`${note.id}`}
          key={note.id}
          className="search__notes"
          onClick={handleClick}
        >
          <div>{note.title}</div>
          <br />
          <div>{note.description}</div>
          <br />
        </section>
      ));
  };

  return <section>{renderSearches()}</section>;
};

export default ContentPage;
