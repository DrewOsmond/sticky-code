import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { restore } from "../store/reducers/sessions";
import Navbar from "./Navbar";
import ContentPage from "./contentPage";
import { getCategories } from "../store/reducers/categories";
import { Switch, Route } from "react-router-dom";
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
          <ContentPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
