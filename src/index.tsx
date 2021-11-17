import React from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import App from "./components/App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { getCards } from "./api";
import { setCards } from "./slices/card";

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(setCards(getCards()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
