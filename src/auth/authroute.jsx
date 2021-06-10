import React from "react";
import { Route, Redirect } from "react-router-dom";
import {fakeAuth} from "./auth";

export const AuthRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => (!fakeAuth.isAuthenticated) ? <Component {...props}/>
        :
          <Redirect to={{
            pathname: "/",
            state: {from: props.location}
          }}/>
        }
    />
  );
};
