import React from 'react';
import { Redirect, Route } from 'react-router';
import { getToken } from "./helpers/tokenHandler";

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
