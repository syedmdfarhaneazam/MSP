import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store"; // Adjust path if store.js is in a different folder
import App from "./App.jsx";
// providing the store in  the upmost file to have it in all componet
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
