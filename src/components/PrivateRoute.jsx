import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, userRole }) => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (userRole && user.role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
