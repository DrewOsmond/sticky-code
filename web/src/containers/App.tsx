import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { restore } from "../store/reducers/sessions";

const App = () => {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restore() as any).then(() => setIsLoaded(true));
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default App;
