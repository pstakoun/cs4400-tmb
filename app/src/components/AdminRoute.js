import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({
  component: Component, user, pathChange, ...rest
}) => (
  <Route
    {...rest}
    render={props => ((user && user.ID) ? ((user.admin) ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
    ) : (
      <Redirect to="/login" />
    ))}
  />
);

export default AdminRoute;
