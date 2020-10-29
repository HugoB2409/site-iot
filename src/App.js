/* src/App.js */
import React from "react";
import Accueil from "./page/Home";
import UserInfo from "./page/UserInfo";
import AddTemp from "./page/NewTemp";
import AddUser from "./page/NewUser";
import User from "./page/User";
import Parameter from "./page/Parameter";
import Warning from "./page/Warning";
import Container from "@material-ui/core/Container";
import NavBar from "./component/NavigationBar";
import Copyright from "./component/Copyright";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

//TODO: UX

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    minHeight: "100vh",
  },
  content: {
    paddingBottom: "4rem",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "2.5rem",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <Router>
        <div className={classes.container}>
          <NavBar />
          <div className={classes.content}>
            <Container>
              <Switch>
                <Route path="/" exact component={Accueil} />
                <Route path="/newTemp" exact component={AddTemp} />
                <Route path="/user/:sub" exact component={UserInfo} />
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
    </div>
  );
};

export default withAuthenticator(App);
