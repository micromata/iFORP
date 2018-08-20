import React from 'react';
import { Redirect, Route } from 'react-router';
import { getToken } from "../../services/auth.service";

export default ({ component: Component, ...rest }) => {
  const token = getToken();
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
