import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux"
import "./index.scss";
import React from "react";
import store from "./store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
);
