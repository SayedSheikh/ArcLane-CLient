import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";
import Loading1 from "../Pages/Loadings/Loading1";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading1></Loading1>;
  }
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
