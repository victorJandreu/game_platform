import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
