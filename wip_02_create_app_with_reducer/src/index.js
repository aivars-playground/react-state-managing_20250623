import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import {BrowserRouter} from "react-router-dom";
import {MyCustomCartContextProvider} from "./cartContext";

ReactDOM.render(
    <ErrorBoundary>
        <BrowserRouter>
            <MyCustomCartContextProvider>
                <App />
            </MyCustomCartContextProvider>
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById("root")
);
