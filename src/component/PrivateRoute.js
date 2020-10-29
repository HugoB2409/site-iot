import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

const PrivateRoute = (props) => {
  const checkIfAdmin = async () => {
    const user = await Auth.currentAuthenticatedUser();

    if (
      user.signInUserSession.accessToken.payload["cognito:groups"][0] ===
      "Admin"
    ) {
      return true;
    }

    return false;
  };

  return checkIfAdmin ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};
export default PrivateRoute;
