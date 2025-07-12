import React from "react";
import useUserRole from "../../Hooks/useUserRole";
import UserProfile from "../UserProfile/UserProfile";
import { Navigate } from "react-router";
import Loading1 from "../Loadings/Loading1";

const DashBoardHome = () => {
  const { userRole, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loading1></Loading1>;
  }
  if (userRole.role === "user" || userRole.role === "member") {
    return <Navigate to="/dashboard/userProfile"></Navigate>;
  }

  // return <div className="dark:text-white">dashboard home {userRole?.role}</div>;
};

export default DashBoardHome;
