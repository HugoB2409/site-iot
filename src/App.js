/* src/App.js */
import React from "react";
import Accueil from "./component/accueil";
import UserInfo from "./component/userInfo";
import AddTemp from "./component/addTemp";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//TODO: UX
//TODO: Ajouter la page parametres
//TODO: Ajouter la page d'ajout de user
//TODO: Cognito: Creer un user group Admin

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Accueil} />
        <Route path="/newTemp" exact component={AddTemp} />
        <Route path="/user/:sub" exact component={UserInfo} />
      </Switch>
    </Router>
  );
};

export default withAuthenticator(App);
