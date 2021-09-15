import { FC, FormEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectSpecificLanguage } from "../../store/reducers/languages";

interface Props {
  languages: [{ id: number; name: string }];
}

const SearchBar: FC<Props> = ({ languages }) => {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector((state) => state.selectedLanguage);
  const [search, setSearch] = useState<string>("");

  const handleChange: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(selectSpecificLanguage(e.target.value) as any);
  };

  const handleSubmit: FormEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
  };

  return (
    <form>
      <select onChange={handleChange}>
        {typeof languages === "object" &&
          languages.map((lang) => (
            <option key={lang.id} value={lang.name}>
              {lang.name}
            </option>
          ))}
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
