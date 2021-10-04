import React, { FC, useState, FormEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNote } from "../../store/reducers/notes";
import { useHistory } from "react-router";
import AddCollection from "../addCollection";
import { User } from "../../types";
import "./index.css";

interface AddNotesProps {
  openModal: Function;
}

const AddNotes: FC<AddNotesProps> = ({ openModal }) => {
  const user: User = useAppSelector((state) => state.session);
  const collections = user.collections;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [collection, setCollection] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleCollectionChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "select a collection") setCollection("");
    else setCollection(e.target.value);
  };

  const handleLanguageChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.currentTarget.value === "select a collection") setLanguage("");
    else setLanguage(e.target.value);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const errors: string[] = [];
    const regExpression = /[a-zA-Z]/g;
    if (!title.match(regExpression)) {
      errors.push("Title must contain words");
    }
    if (!description.match(regExpression)) {
      errors.push("Description must contain words");
    }
    if (!collection) {
      errors.push("Please select a collection");
    }
    if (!language) {
      errors.push("Please select a language");
    }
    if (!title) {
      errors.push("Tile cannot be empty");
    }
    if (!description) {
      errors.push("Description cannot be empty");
    }

    if (errors.length) {
      setErrors(errors);
    } else {
      setErrors([]);
      const collectionId: { id: number }[] = collections.filter(
        (col: { name: string }) => col.name === collection
      );
      if (collectionId.length > 0) {
        dispatch(
          addNote({
            title: title.trim(),
            description: description.trim(),
            language,
            collectionId: collectionId[0].id,
          }) as any
        );
        openModal(false);
      } else {
        setErrors(["please select a collection"]);
      }
      //setTimeout to delay it slightly so we have time to add items to the DB
      setTimeout(() => {
        history.push("/adding-note");
      }, 100);
    }
  };

  return (
    <div className="add-note">
      {collection === "add collection" && (
        <AddCollection user={user} setCollection={setCollection} />
      )}
      <form onSubmit={handleSubmit}>
        {errors.length > 0 &&
          errors.map((error, i) => <li key={i}>{error}</li>)}
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value.split("  ").join(" "))}
        ></input>
        <select
          onChange={handleCollectionChange}
          defaultValue="select a collection"
        >
          <option value="select a collection">select a Collection</option>
          {collections.length > 0 &&
            collections.map((collections: { name: string; id: number }) => (
              <option
                key={collections.id}
                value={collections.name}
                selected={collections.name === collection}
              >
                {collections.name}
              </option>
            ))}
          <option value="add collection">add collection</option>
        </select>

        <select onChange={handleLanguageChange}>
          <option value="language">language</option>
          <option value="javascript">javascript</option>
          <option value="typescript">typescript</option>
          <option value="go">go</option>
          <option value="python">python</option>
        </select>
        <br />
        <textarea
          rows={10}
          cols={40}
          value={description}
          placeholder="Add your note"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="add-note-btn">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
 