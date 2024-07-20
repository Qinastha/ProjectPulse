import { RouterProvider } from "react-router-dom";
import router from "./routes";
import React from "react";
import { Alert } from "./core/components/Alert/Alert";

const App: React.FC = () => {
  return (
    <>
      <Alert />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
