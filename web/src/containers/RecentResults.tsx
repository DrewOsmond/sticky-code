import { useAppSelector, useAppDispatch } from "../store/hooks";
import ContentPage from "../components/Content";
import { useEffect } from "react";
import { recentSearch } from "../store/reducers/searchResults";

const RecentResults = () => {
  const dispatch = useAppDispatch();
  const recent = useAppSelector((state) => state.search);

  useEffect(() => {
    dispatch(recentSearch() as any);
  }, []);

  return (
    <div className="results">
      <ContentPage results={recent} />
    </div>
  );
};

export default RecentResults;
