import React from "react";
import useUserRole from "../../Hooks/useUserRole";
import UserProfile from "../UserProfile/UserProfile";
import { Navigate } from "react-router";

const DashBoardHome = () => {
  const { userRole, roleLoading } = useUserRole();

  if (roleLoading) {
    return <p>Role loading from dashboardHome component...</p>;
  }
  if (userRole.role === "user") {
    return <Navigate to="/dashboard/userProfile"></Navigate>;
  }

  return <div className="dark:text-white">dashboard home {userRole?.role}</div>;
};

export default DashBoardHome;
