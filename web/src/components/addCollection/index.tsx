import { useState, FC, FormEventHandler } from "react";
import { createCollection } from "../../store/reducers/sessions";
import { useAppDispatch } from "../../store/hooks";

interface Props {
  user: {
    id: number;
    username: string;
    email: string;
    favorite_notes: [];
    collections: [];
  };
  setCollection: Function;
}

const AddCollection: FC<Props> = ({ user, setCollection }) => {
  const [name, setName] = useState("");
  const [personal, setPersonal] = useState("public");
  const [errors, setErrors] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (name.length) {
      const isPersonal = personal === "public" ? false : true;
      dispatch(createCollection(user, name, isPersonal) as any);
      setCollection(name);
    } else {
      setErrors(true);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {errors && <li>collection name cannot be blank</li>}
      <input
        type="text"
        placeholder="collection name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      ></input>
      <button type="submit">add collection</button>

      <input
        type="radio"
        id="public"
        value="public"
        name="public collections"
        checked={personal === "public"}
      />
      <label htmlFor="public">public collection</label>

      <input
        type="radio"
        id="private"
        value="private"
        name="private collection"
        checked={personal === "private"}
        onChange={(e) => setPersonal(e.currentTarget.value)}
      />
      <label htmlFor="private">private collection</label>
    </form>
  );
};

export default AddCollection;
