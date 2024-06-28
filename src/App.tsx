import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getUser, reqUsers } from "./store/projectsSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  useEffect(() => {
    if (!user) {
      dispatch(reqUsers());
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
