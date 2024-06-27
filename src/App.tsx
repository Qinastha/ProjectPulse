import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { reqUsers } from "./store/projectsSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(reqUsers);
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
