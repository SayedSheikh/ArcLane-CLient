import React from "react";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";

const UsersRoute = ({ children }) => {
  const { userRole, roleLoading } = useUserRole();
  const { user, loading } = useAuth();

  if (loading || roleLoading) {
    return <p>role loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  if (userRole !== "user") {
    return <Navigate to="/forbidden"></Navigate>;
  }
  return children;
};

export default UsersRoute;
