import React from "react";
import { Outlet } from "react-router";

import CustomeNavbar from "../../Pages/Shared/Navbar/CustomeNavbar";
import CustomFooter from "../../Pages/Shared/Footer/CustomFooter";

const MainLayout = () => {
  return (
    <div className="font-inter">
      <CustomeNavbar />
      <div className="min-h-[calc(100vh-60px)] dark:dark:bg-[#030712]">
        <Outlet />
      </div>
      <CustomFooter />
    </div>
  );
};

export default MainLayout;
