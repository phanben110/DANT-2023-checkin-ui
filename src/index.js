import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from "@material-ui/core";
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import store from "./store/store"

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,

  document.getElementById("root")
);
