import { useAppSelector, useAppDispatch } from "../store/hooks";
import ContentPage from "../components/content/index";
import { useEffect } from "react";
import { recentSearch } from "../store/reducers/searchResults";

const RecentResults = () => {
  const dispatch = useAppDispatch();
  const recent = useAppSelector((state) => state.search);
  console.log("huh?");
  console.log(recent);
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
