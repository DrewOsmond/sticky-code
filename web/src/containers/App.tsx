import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { restore } from "../store/reducers/sessions";
import Navbar from "./Navbar";
import ContentPage from "./contentPage";
import { getCategories } from "../store/reducers/categories";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restore() as any);
    dispatch(getCategories() as any);
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <ContentPage />
    </div>
  );
};

export default App;
