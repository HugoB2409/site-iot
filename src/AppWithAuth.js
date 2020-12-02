import React, { useState } from "react";
import { Authenticator, ForgotPassword, SignOut } from "aws-amplify-react";
import { SignIn } from "aws-amplify-react";
import config from "./aws-exports";
import CustomSignIn from "./page/Authentification/CustomSignIn";
import CustomForgotPass from "./page/Authentification/CustomForgotPass";
import CustomForgotPassSubmit from "./page/Authentification/CustomForgotPassSubmit";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

//TODO: Modifier le theme pour rendre le site plus beau

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#3A3294" }, // custom color in hex
    error: red,
  },
});

const AppWithAuth = () => {
  const [username, setUsername] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <Authenticator
        hide={[SignIn, ForgotPassword, SignOut]}
        amplifyConfig={config}
      >
        <CustomSignIn />
        <CustomForgotPass setUsername={setUsername} />
        <CustomForgotPassSubmit username={username} />
        <App />
      </Authenticator>
    </ThemeProvider>
  );
};

export default AppWithAuth;
