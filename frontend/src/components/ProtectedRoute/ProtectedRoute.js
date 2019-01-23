import React from 'react';
import { Redirect, Route } from 'react-router';
import { verifyToken } from "../../services/auth.service";

export default ({ component: Component, ...rest }) => {
  const isTokenValid = verifyToken();
  return (
    <Route
      {...rest}
      render={props =>
        isTokenValid ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
