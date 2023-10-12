

import Login  from "../pages/login/Login";
import React from "react";
import { Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils";

export default function Auth() {
  return isLoggedIn() ? <Redirect to="/app" /> : <Login />;
}
