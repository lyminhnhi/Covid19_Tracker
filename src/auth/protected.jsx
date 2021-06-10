import React from "react";
import { Route, Redirect } from "react-router-dom";
import {fakeAuth} from "./auth";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => (fakeAuth.isAuthenticated) ? <Component {...props}/>
        :
          <Redirect to={{
            pathname: "/signin",
            state: {from: props.location}
          }}/>
        }
    />
  );
};
