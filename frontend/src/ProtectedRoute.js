import React from 'react';
import { Redirect, Route } from 'react-router';

export default ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('id_token');
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
