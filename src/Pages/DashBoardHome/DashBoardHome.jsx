import React from "react";
import useUserRole from "../../Hooks/useUserRole";

const DashBoardHome = () => {
  const { userRole, roleLoading } = useUserRole();

  return <div className="dark:text-white">dashboard home {userRole?.role}</div>;
};

export default DashBoardHome;
