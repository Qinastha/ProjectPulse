import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import React, { lazy, Suspense } from "react";
import store from "./store";
import { AxiosInterceptor } from "./core/interceptors/authInterceptor";
import { LogoFallback } from "./Components";

const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store}>
    <AxiosInterceptor>
      <Suspense fallback={<LogoFallback />}>
        <App />
      </Suspense>
    </AxiosInterceptor>
  </Provider>,
);
