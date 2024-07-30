import { RouterProvider } from "react-router-dom";
import router from "./routes";
import React from "react";
import { Alert } from "./core/components/Alert/Alert";
import { ThemeProvider } from "./core/contexts/ThemeContext";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider>
        <Alert />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
