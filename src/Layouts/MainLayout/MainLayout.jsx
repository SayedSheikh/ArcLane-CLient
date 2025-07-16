import React from "react";
import { Outlet, useNavigation } from "react-router";

import CustomeNavbar from "../../Pages/Shared/Navbar/CustomeNavbar";
import CustomFooter from "../../Pages/Shared/Footer/CustomFooter";
import ScrollToTop from "../../Pages/Shared/ScrollToTop/ScrollToTop";
import Loading1 from "../../Pages/Loadings/Loading1";

const MainLayout = () => {
  const navigation = useNavigation();

  return (
    <div className="font-inter">
      <ScrollToTop />
      <CustomeNavbar />
      <div className="min-h-[calc(100vh-60px)] dark:bg-[#030712]">
        {navigation.state === "loading" ? <Loading1></Loading1> : <Outlet />}
      </div>
      <CustomFooter />
    </div>
  );
};

export default MainLayout;
