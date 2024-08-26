import { RouterProvider } from "react-router-dom";
import React from "react";
import router from "./routes";
import { ThemeProvider } from "./core/contexts/ThemeContext";
import { Alert } from "./core";
import "@Qinastha/pulse_library/dist/index.css";

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
