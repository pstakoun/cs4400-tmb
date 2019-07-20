import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component, user, pathChange, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      pathChange(props.location);
      return ((user && user.ID) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      ));
    }}
  />
);

export default PrivateRoute;
