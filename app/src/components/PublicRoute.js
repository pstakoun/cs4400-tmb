import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({
  component: Component, user, pathChange, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      pathChange(props.location);
      return (!(user && user.ID) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      ));
    }}
  />
);

export default PublicRoute;
