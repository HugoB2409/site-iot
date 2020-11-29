import React, { useState } from "react";
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
import TempInfo from "./page/TempInfo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import indigo from "@material-ui/core/colors/indigo";
import purple from "@material-ui/core/colors/purple";

//TODO: Changer le login
//TODO: Page de parametres ??
//TODO: Filter
//TODO: Validation ajout user et temp avec message succes ou erreur
//TODO: Empecher un user non admin d'a acceder au site

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
  const [darkState, setDarkState] = useState(false);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      grey: {
        900: "#121212", // overrides success
      },
      background: {
        paper: "#000000",
      },
      primary: {
        main: purple[500],
      },
      secondary: {
        main: indigo[500],
      },
    },
  });

  const theme = createMuiTheme({
    palette: {
      type: "light",
      background: {
        default: "#000000",
      },
      primary: {
        main: indigo[500],
      },
      secondary: {
        main: red[500],
      },
    },
  });

  const palletType = darkState ? darkTheme : theme;

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <div>
      {props.authState === "signedIn" ? (
        <Router>
          <ThemeProvider theme={palletType}>
            <div className={classes.container}>
              <NavBar changeTheme={handleThemeChange} />
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
          </ThemeProvider>
        </Router>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default App;
