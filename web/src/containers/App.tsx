import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { restore } from "../store/reducers/sessions";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Note from "./Note";
import RecentResults from "./RecentResults";
import SearchResults from "./SearchResults";
import AddNotes from "../components/AddNotes";
import Profile from "../components/PersonalProfile/Profie";
import SelectedCollection from "../components/Collection";
import Limbo from "../components/Limbo";
import "./app.css";
import UserProfile from "../components/Profile";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restore() as any);
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
        <Route path="/adding-note">
          <Limbo />
        </Route>
        <Route path="/add-note">
          <AddNotes />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/profile/:user">
          <UserProfile />
        </Route>
        <Route path="/collection/:username/:id">
          <SelectedCollection />
        </Route>
      </Switch>
    </>
  );
};

export default App;
