import { FC, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { searchFor } from "../../store/reducers/searchResults";

const SearchBar: FC = () => {
  const [language, setLanguage] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "pick a language") {
      setLanguage("");
    } else setLanguage(e.target.value);
  };

  const handleSubmit: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (!language) {
      setErrors(["You must select a language"]);
    } else if (!search) {
      setErrors(["Your search may not be blank"]);
    } else {
      setErrors([]);
      dispatch(searchFor([search.trim(), language]) as any);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && errors.map((error) => <li>{error}</li>)}
      <select onChange={handleChange}>
        <option value="pick a language">pick a language</option>
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
      <button type="submit">search for notes</button>
    </form>
  );
};

export default SearchBar;
