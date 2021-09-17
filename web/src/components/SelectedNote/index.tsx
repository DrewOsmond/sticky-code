import { FC } from "react";

interface Props {
  note: {
    id: number;
    title: string;
    description: string;
    language: string;
  };
}

const Note: FC<Props> = ({ note }) => {
  return (
    <section>
      <h3>{note.title}</h3>
      <div>{note.language}</div>
      <div>{note.description}</div>
    </section>
  );
};

export default Note;
