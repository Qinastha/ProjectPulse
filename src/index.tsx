import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import React, { lazy, Suspense } from "react";
import store from "./store";
import { AxiosInterceptor } from "./core/interceptors/authInterceptor";
import { LogoLoader } from "@Qinastha/pulse_library";
import "@Qinastha/pulse_library/dist/index.css";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const App = lazy(() => delay(3000).then(() => import("./App")));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store}>
    <AxiosInterceptor>
      <Suspense fallback={<LogoLoader />}>
        <App />
      </Suspense>
    </AxiosInterceptor>
  </Provider>,
);
