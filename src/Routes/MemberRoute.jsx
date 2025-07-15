import React from "react";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import Loading1 from "../Pages/Loadings/Loading1";
import Login from "../Pages/Authentication/Login/Login";
import { useLocation } from "react-router";
import ForbiddenPage from "../Pages/ForbiddenPage/ForbiddenPage";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { userRole, roleLoading } = useUserRole();
  const { pathname } = useLocation();

  if (loading || roleLoading) {
    return <Loading1></Loading1>;
  }

  if (!user) {
    return <Login state={{ from: pathname }}></Login>;
  }
  if (userRole.role !== "member") {
    return <ForbiddenPage></ForbiddenPage>;
  }

  return children;
};

export default MemberRoute;
