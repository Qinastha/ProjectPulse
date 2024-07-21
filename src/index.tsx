import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import "./index.scss";
import React from "react";
import store from "./store";
import {AxiosInterceptor} from "./core/interceptors/authInterceptor";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <AxiosInterceptor>
                <App/>
            </AxiosInterceptor>
        </React.StrictMode>
    </Provider>,
);
