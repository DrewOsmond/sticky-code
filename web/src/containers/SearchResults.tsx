import { useAppSelector } from "../store/hooks";
import ContentPage from "../components/Content/index";

const SearchResults = () => {
  const searchResults = useAppSelector((state) => state.search);
  return <ContentPage results={searchResults} />;
};

export default SearchResults;
