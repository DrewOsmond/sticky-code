import { FC } from "react";

interface Props {
  note: {
    id: number;
    title: string;
    description: string;
    language: string;
    user: {
      id: number | string;
      username: string;
      email: string;
    };
  };
}

const Note: FC<Props> = ({ note }) => {
  return (
    <section>
      <div>{note.language}</div>
      <h3>{note.title}</h3>
      <div>By: {note.user.username}</div>
      <div>{note.description}</div>
    </section>
  );
};

export default Note;
