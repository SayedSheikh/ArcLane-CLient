import React from "react";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";
import Loading1 from "../Pages/Loadings/Loading1";

const UsersRoute = ({ children }) => {
  const { userRole, roleLoading } = useUserRole();
  const { user, loading } = useAuth();

  if (loading || roleLoading) {
    return <Loading1></Loading1>;
  }

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  if (!["user", "member"].includes(userRole?.role)) {
    return <Navigate to="/forbidden"></Navigate>;
  }

  return children;
};

export default UsersRoute;
