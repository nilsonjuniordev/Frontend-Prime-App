// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to="/Home" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
