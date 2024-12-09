import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MaterialUIControllerProvider } from "./context";
import { Fallback } from "./lib/error/fallback";
import { ErrorBoundary } from "./lib/error";
import configureStore from "./redux-store/store";

// Material Dashboard 2 React Context Provider

const store = configureStore();
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MaterialUIControllerProvider>
        <ErrorBoundary FallbackComponent={Fallback}>
          <App />
        </ErrorBoundary>
      </MaterialUIControllerProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
