import { useState, FC, FormEventHandler } from "react";
import { createCollection } from "../../store/reducers/sessions";
import { useAppDispatch } from "../../store/hooks";
import { User } from "../../types";
interface Props {
  user: User;
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
      dispatch(createCollection(name, isPersonal) as any);
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
        onChange={(e) =>
          setPersonal(
            e.currentTarget.id !== personal ? "public" : e.currentTarget.value
          )
        }
      />{" "}
      public collection
      <input
        type="radio"
        id="private"
        value="private"
        name="private collection"
        checked={personal === "private"}
        onChange={(e) =>
          setPersonal(
            e.currentTarget.value !== personal ? "private" : e.currentTarget.id
          )
        }
      />
      private collection
    </form>
  );
};

export default AddCollection;
