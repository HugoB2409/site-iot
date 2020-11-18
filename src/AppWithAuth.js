import React from "react";
import { Authenticator, SignIn } from "aws-amplify-react";
import config from "./aws-exports";
import CustomSignIn from "./page/CustomSignIn";
import App from "./App";

const AppWithAuth = () => {
  return (
    <div>
      <Authenticator hide={[SignIn]} amplifyConfig={config}>
        <CustomSignIn />
        <App />
      </Authenticator>
    </div>
  );
};

export default AppWithAuth;
