import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";


export const AuthRoutes = ({ setIsLogged }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/registro">
          <Register />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
};