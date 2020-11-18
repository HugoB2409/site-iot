import React from "react";
import ReactDOM from "react-dom";
import AppWithAuth from "./AppWithAuth";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <AppWithAuth />
  </React.StrictMode>,
  document.getElementById("root")
);
