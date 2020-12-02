import React from "react";
import Accueil from "./page/Home";
import UserInfo from "./page/User/UserInfo";
import AddTemp from "./page/Temperature/NewTemp";
import AddUser from "./page/User/NewUser";
import User from "./page/User/User";
import Parameter from "./page/Parameter";
import Warning from "./page/Warning";
import Container from "@material-ui/core/Container";
import NavBar from "./component/NavigationBar";
import Copyright from "./component/Copyright";
import TempInfo from "./page/Temperature/TempInfo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

//TODO: Empecher un user non admin d'acceder au site
//TODO: Refactor le code
//TODO: Ameliorer la navigation
//TODO: Faire un beau component de loading ou un skeleton et l'implementer dans les pages qui font des calls a l'api
//TODO: Regarder pour optimiser la grosseur du projet(ex: code splitting, lazy import, Suspense, etc)

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    minHeight: "90vh",
  },
  content: {
    paddingBottom: "4rem",
    marginTop: 48,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "2.5rem",
  },
}));

const App = (props) => {
  const classes = useStyles();

  return (
    <div>
      {props.authState === "signedIn" ? (
        <Router>
          <div className={classes.container}>
            <NavBar />
            <div className={classes.content}>
              <Container>
                <Switch>
                  <Route path="/" exact component={Accueil} />
                  <Route path="/newTemp" exact component={AddTemp} />
                  <Route path="/user/:name" exact component={UserInfo} />
                  <Route path="/temp/:id" exact component={TempInfo} />
                  <Route path="/newUser" exact component={AddUser} />
                  <Route path="/User" exact component={User} />
                  <Route path="/parameter" exact component={Parameter} />
                  <Route path="/warning" exact component={Warning} />
                </Switch>
              </Container>
            </div>
            <div className={classes.footer}>
              <Copyright />
            </div>
          </div>
        </Router>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default App;
