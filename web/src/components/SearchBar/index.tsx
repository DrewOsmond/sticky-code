import { FC, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { searchFor } from "../../store/reducers/searchResults";
import { useHistory } from "react-router-dom";
import "./index.css";

const SearchBar: FC = () => {
  // const [language, setLanguage] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const history = useHistory();

  // const handleChange: FormEventHandler = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (e.target.value === "languages") {
  //     setLanguage("");
  //   } else setLanguage(e.target.value);
  // };

  const handleSubmit: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    // if (!language) {
    //   setErrors(["You must select a language"]);
    // } else if (!search) {
    if (!search) {
      setErrors(["Your search may not be blank"]);
    } else {
      setTimeout(() => {
        history.push("/search");
      }, 100);
      setErrors([]);
      dispatch(searchFor([search.trim()]) as any);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyPress={(e) => (e.key === "Enter" ? handleSubmit(e) : null)}
    >
      {errors.length > 0 && errors.map((error, i) => <li key={i}>{error}</li>)}
      {/* <select onChange={handleChange}>
        <option value="language">language</option>
        <option value="javascript">javascript</option>
        <option value="typescrip">typescript</option>
        <option value="go">go</option>
        <option value="python">python</option>
      </select> */}
      <span>
        <input
          type="text"
          placeholder="search"
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>

        <button type="submit" className="search-button">
          Search
        </button>
      </span>
    </form>
  );
};

export default SearchBar;
