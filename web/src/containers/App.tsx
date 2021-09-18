import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { restore } from "../store/reducers/sessions";
import { getCategories } from "../store/reducers/categories";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Note from "./Note";
import RecentResults from "./RecentResults";
import SearchResults from "./SearchResults";
import AddNotes from "../components/AddNotes";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restore() as any);
    dispatch(getCategories() as any);
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <RecentResults />
        </Route>
        <Route path="/search">
          <SearchResults />
        </Route>
        <Route path="/note/:id">
          <Note />
        </Route>
        <Route path="/add-note">
          <AddNotes />
        </Route>
      </Switch>
    </>
  );
};

export default App;
