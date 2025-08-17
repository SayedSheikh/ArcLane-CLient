import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, NavLink } from "react-router"; // ✅ Make sure you're using 'react-router-dom'
import Logo from "../Logo/Logo";
import CustomAvatar from "../Avatar/CustomAvatar";
import useAuth from "../../../Hooks/useAuth";
import ThemeChange from "../ThemeChange/ThemeChange";

const CustomeNavbar = () => {
  const { user } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#030712] backdrop-blur shadow-sm shadow-primary/30">
      <Navbar fluid className="max-w-[1500px] mx-auto dark:bg-[#030712]">
        <NavbarBrand as={Link} to="/">
          <Logo />
        </NavbarBrand>

        <div className="flex items-center gap-2 md:order-2">
          <ThemeChange />

          {user ? (
            <CustomAvatar />
          ) : (
            <Link to="/login">
              <Button
                size="sm"
                className="hidden md:block bg-primary dark:bg-primary hover:bg-primary/90 dark:hover:bg-primary/90 cursor-pointer">
                Login
              </Button>
            </Link>
          )}

          <NavbarToggle />
        </div>

        <NavbarCollapse className="dark:text-white">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-2 rounded ${
                isActive ? "text-primary font-semibold" : ""
              }`
            }>
            Home
          </NavLink>
          <NavLink
            to="/apartment"
            className={({ isActive }) =>
              `px-2 py-2 rounded ${
                isActive ? "text-primary font-semibold" : ""
              }`
            }>
            Apartment
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `px-2 py-2 rounded ${
                isActive ? "text-primary font-semibold" : ""
              }`
            }>
            AboutUs
          </NavLink>

          {/* /dashboard/userProfile */}

          {/* Show login on mobile only if not logged in */}
          {!user && (
            <Link to="/login" className="block md:hidden w-full mt-2">
              <Button
                size="sm"
                className="w-full bg-primary dark:bg-primary hover:bg-primary/90 dark:hover:bg-primary/90">
                Login
              </Button>
            </Link>
          )}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default CustomeNavbar;
