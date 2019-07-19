import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return Cookies.get('connect.sid') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

export default PrivateRoute;
