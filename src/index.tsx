import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "./styles/commons/Reset.module.scss";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  rootElement.style.flexGrow = "1"; //
  rootElement.style.display = "flex"; // root div flex 적용
  rootElement.style.flexDirection = "column";
  rootElement.style.justifyContent = "center";
  rootElement.style.alignItems = "center";
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
