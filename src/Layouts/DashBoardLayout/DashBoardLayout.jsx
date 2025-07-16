import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { NavLink, Outlet, useNavigation } from "react-router";
import Logo from "../../Pages/Shared/Logo/Logo";
import useUserRole from "../../Hooks/useUserRole";
import {
  FaBullhorn,
  FaCreditCard,
  FaFileSignature,
  FaHistory,
  FaTicketAlt,
  FaUserCircle,
  FaUsers,
  FaUsersCog,
  FaUserShield,
} from "react-icons/fa";
import ThemeChange from "../../Pages/Shared/ThemeChange/ThemeChange";
import Loading1 from "../../Pages/Loadings/Loading1";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole } = useUserRole();
  const handleClose = () => setIsOpen(false);

  const navigation = useNavigation();

  const getNavStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md font-semibold dark:text-white transition-colors group ${
      isActive
        ? "bg-gray-200 dark:bg-gray-700"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  const SidebarContent = () => (
    <Sidebar
      aria-label="Responsive Sidebar"
      className="h-screen dark:bg-dark font-inter border-r border-primary overflow-y-auto">
      <SidebarItems className="mx-0">
        <Logo />
        {/* admin routes */}
        <SidebarItemGroup className="flex flex-col">
          {userRole?.role === "admin" && (
            <>
              <NavLink to="/dashboard/admin-profile" className={getNavStyle}>
                <FaUserShield className="text-blue-500 text-xl group-hover:text-blue-600 transition-colors" />
                Admin Profile
              </NavLink>
              <NavLink to="/dashboard/users" className={getNavStyle}>
                <FaUsers className="text-green-500 text-xl group-hover:text-green-600 transition-colors" />
                Users List
              </NavLink>
              <NavLink to="/dashboard/manage-members" className={getNavStyle}>
                <FaUsersCog className="text-purple-500 text-xl group-hover:text-indigo-600 transition-colors" />
                Manage Members
              </NavLink>
              <NavLink
                to="/dashboard/make-announcements"
                className={getNavStyle}>
                <FaBullhorn className="text-orange-500 text-xl group-hover:text-orange-600 transition-colors" />
                Make Announcement
              </NavLink>
              <NavLink
                to="/dashboard/agreement-requests"
                className={getNavStyle}>
                <FaFileSignature className="text-amber-500 text-xl group-hover:text-amber-600 transition-colors" />
                Agreement Requests
              </NavLink>
              <NavLink to="/dashboard/manage-coupons" className={getNavStyle}>
                <FaTicketAlt className="text-pink-500 text-xl group-hover:text-pink-600 transition-colors" />
                Manage Coupons
              </NavLink>
            </>
          )}

          {["user", "member"].includes(userRole?.role) && (
            <>
              <NavLink to="/dashboard/userProfile" className={getNavStyle}>
                <FaUserCircle className="text-blue-500 text-xl group-hover:text-blue-600 transition-colors" />
                My Profile
              </NavLink>
              <NavLink to="/dashboard/announcements" className={getNavStyle}>
                <FaBullhorn className="text-orange-500 text-xl group-hover:text-orange-600 transition-colors" />
                Announcements
              </NavLink>
            </>
          )}

          {userRole?.role === "member" && (
            <>
              <NavLink to="/dashboard/payment" className={getNavStyle}>
                <FaCreditCard className="text-purple-500 text-xl group-hover:text-purple-600 transition-colors" />
                Make Payment
              </NavLink>
              <NavLink to="/dashboard/payment-history" className={getNavStyle}>
                <FaHistory className="text-rose-500 text-xl group-hover:text-rose-600 transition-colors" />
                Payment History
              </NavLink>
            </>
          )}
        </SidebarItemGroup>

        <SidebarItemGroup>
          <div className="flex gap-2 items-center">
            <p className="text-xl font-semibold dark:text-white">
              Change Theme :
            </p>
            <ThemeChange />
          </div>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );

  return (
    <div className="dark:bg-dark  font-inter">
      <div className="max-w-[1700px] mx-auto min-h-screen flex flex-col lg:flex-row overflow-visible relative">
        <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r sticky top-0 h-full">
          <SidebarContent />
        </div>

        <nav className="lg:hidden w-full bg-white dark:bg-gray-800 p-4 flex items-center justify-between border-b">
          <Button size="sm" onClick={() => setIsOpen(true)}>
            <HiMenu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
        </nav>

        <Drawer
          backdrop={true}
          open={isOpen}
          onClose={handleClose}
          className="px-0 max-w-[250px]">
          <DrawerHeader title="" titleIcon={() => <></>} />
          <DrawerItems className="h-full">
            <SidebarContent />
          </DrawerItems>
        </Drawer>

        <div className="flex-1 bg-white dark:bg-dark/20 p-4">
          {navigation.state === "loading" ? <Loading1></Loading1> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
