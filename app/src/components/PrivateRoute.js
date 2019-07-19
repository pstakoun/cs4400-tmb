import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      console.log(Cookies.get('connect.sid'));
      console.log(Cookies.getJSON());
      return Cookies.get('connect.sid') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

export default PrivateRoute;
