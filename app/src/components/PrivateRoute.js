import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component, user, ...rest
}) => (
  <Route
    {...rest}
    render={props => ((user && user.ID) ? (
      <Component user={user} {...props} />
    ) : (
      <Redirect to="/login" />
    ))}
  />
);

export default PrivateRoute;
