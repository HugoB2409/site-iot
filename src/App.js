/* src/App.js */
import React, { useEffect, useState } from "react";
import Accueil from "./accueil";
import { withAuthenticator } from "@aws-amplify/ui-react";
import UserInfo from "./userInfo";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  return (
        <Router>
          <Switch>
          <Route path="/" exact component={Accueil}/>
            <Route path="/user/:id" exact component={UserInfo}/>
          </Switch>
        </Router>
  );
};


export default withAuthenticator(App);
