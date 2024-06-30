import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getUser, reqUsers } from "./store/userSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  // useEffect(() => {
  //   dispatch(reqUsers());
  // }, []);

  return <RouterProvider router={router} />;
};

export default App;
