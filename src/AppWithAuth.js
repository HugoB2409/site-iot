import React from "react";
import { Authenticator, ForgotPassword } from "aws-amplify-react";
import { SignIn } from "aws-amplify-react";
import config from "./aws-exports";
import CustomSignIn from "./page/CustomSignIn";
import CustomForgotPass from "./page/CustomForgotPass";
import CustomForgotPassSubmit from "./page/CustomForgotPassSubmit";
import App from "./App";

//TODO: Ajouter un state qui garde le username pour le passer a CustomForgotPassSubmit

const AppWithAuth = () => {
  return (
    <div>
      <Authenticator hide={[SignIn, ForgotPassword]} amplifyConfig={config}>
        <CustomSignIn />
        <CustomForgotPass />
        <CustomForgotPassSubmit />
        <App />
      </Authenticator>
    </div>
  );
};

export default AppWithAuth;
