import React, { memo } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "../utils";
import Login from "../pages/login/Login"
import { FindDetal } from "../pages";
import PrivateRoutes from "./PrivateRoutes";
import Auth from "./Auth";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/app">
          <PrivateRoutes />
        </Route>
        <Route path="/search">
          <FindDetal />
        </Route>
        <Route path="">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default memo(Routes);
