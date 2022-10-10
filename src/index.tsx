import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/styles/index.css";
import { MantineProvider, Button } from '@mantine/core';

import { Provider } from "react-redux";
import { store } from "./features/store";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
