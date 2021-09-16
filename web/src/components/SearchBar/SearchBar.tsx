import { FC, FormEventHandler, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";

const SearchBar: FC = () => {
  const [language, setLanguage] = useState<string>();
  const [search, setSearch] = useState<string>("");

  const handleChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLanguage(e.target.value);
  };

  const handleSubmit: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
  };

  return (
    <form>
      <select onChange={handleChange} placeholder="pick language">
        <option value="javascript">javascript</option>
        <option value="go">go</option>
        <option value="python">python</option>
      </select>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <button onClick={handleSubmit}>search for notes</button>
    </form>
  );
};

export default SearchBar;
