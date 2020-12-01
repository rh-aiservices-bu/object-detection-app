import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./utilities/configureStore";
// eslint-disable-next-line
import socketChannel from "./Socket/channel";

import "typeface-roboto";
import "./index.scss";
import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
