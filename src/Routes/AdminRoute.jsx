import React from "react";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";
import Loading1 from "../Pages/Loadings/Loading1";

const AdminRoute = ({ children }) => {
  const { userRole, roleLoading } = useUserRole();
  const { user, loading } = useAuth();

  if (loading || roleLoading) {
    return <Loading1></Loading1>;
  }

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  if (!["admin"].includes(userRole?.role)) {
    return <Navigate to="/forbidden"></Navigate>;
  }

  return children;
};

export default AdminRoute;
