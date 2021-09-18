import React, { FC, useState, FormEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNote } from "../../store/reducers/notes";
import { useHistory } from "react-router";

const AddNotes: FC = () => {
  const categories: [] = useAppSelector((state) => state.allCategories);
  const user: { id: number } = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [category, setCategory] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleCategoryChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "select a category") setCategory("");
    else setCategory(e.target.value);
  };

  const handleLanguageChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "select a language") setLanguage("");
    else setLanguage(e.target.value);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!category) errors.push("Please select a category");
    if (!language) errors.push("Please select a language");
    if (!title) errors.push("Tile cannot be empty");
    if (!description) errors.push("Description cannot be empty");
    if (errors.length) setErrors(errors);
    else {
      setErrors([]);
      const categoryId: { id: number }[] = categories.filter(
        (cate: { name: string }) => cate.name === category
      );
      dispatch(
        addNote({
          title,
          description,
          language,
          id: user.id,
          categoryId: categoryId[0].id,
        }) as any
      );
      //setTimeout to delay it slightly so we have time to add items to the DB
      setTimeout(() => {
        history.push("/");
      }, 100);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && errors.map((error, i) => <li key={i}>{error}</li>)}
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <select onChange={handleCategoryChange}>
        <option value="select a category">select a category</option>
        {categories.map((category: { name: string; id: number }) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select onChange={handleLanguageChange}>
        <option value="pick a language">pick a language</option>
        <option value="javascript">javascript</option>
        <option value="typescrip">typescript</option>
        <option value="go">go</option>
        <option value="python">python</option>
      </select>
      <br />
      <textarea
        value={description}
        placeholder="Add your note"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNotes;
