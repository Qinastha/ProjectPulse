import { RouterProvider } from "react-router-dom";
import router from "./routes";
import React from "react";

import { ThemeProvider } from "./core/contexts/ThemeContext";
import { Alert } from "./core";

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
