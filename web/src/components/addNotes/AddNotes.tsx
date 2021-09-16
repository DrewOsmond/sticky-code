import React, { FC, useState, FormEventHandler } from "react";
import { useAppSelector } from "../../store/hooks";

interface Props {}

const AddNotes: FC = () => {
  const categories: [] = useAppSelector((state) => state.allCategories);
  const [selectedCategory, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const handleSelectChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "select a category") setCategory("");
    else setCategory(e.target.value);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!selectedCategory) setErrors(["Please select a category"]);
    else if (!title) setErrors(["Tile cannot be empty"]);
    else if (!description) setErrors(["Description cannot be empty"]);
    else {
      setErrors([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && errors.map((error) => <li>{error}</li>)}
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <select onChange={handleSelectChange}>
        <option value="select a category">select a category</option>
        {categories.map((category: { name: string; id: number }) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
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
