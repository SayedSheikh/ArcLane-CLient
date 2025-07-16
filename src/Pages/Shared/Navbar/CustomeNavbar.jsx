import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import "./navbar.css";
import Logo from "../Logo/Logo";
import CustomAvatar from "../Avatar/CustomAvatar";
import useAuth from "../../../Hooks/useAuth";
import ThemeChange from "../ThemeChange/ThemeChange";

const CustomeNavbar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-[#030712] shadow-sm shadow-primary/50 sticky top-0  backdrop-blur-sm z-10">
      <Navbar
        fluid
        rounded
        className="dark:bg-[#030712] max-w-[1500px] mx-auto">
        <NavbarBrand>
          {/* Logo or App Name */}
          <Logo></Logo>
        </NavbarBrand>
        <div className="flex md:order-2 items-center gap-2">
          <ThemeChange></ThemeChange>

          {user ? (
            <CustomAvatar />
          ) : (
            <Link to="/login">
              <Button className="hidden md:block cursor-pointer bg-primary dark:bg-primary hover:bg-primary/90 dark:hover:bg-primary/90">
                LogIn
              </Button>
            </Link>
          )}

          <NavbarToggle />
        </div>
        <NavbarCollapse className="dark:text-white">
          {/* <NavbarLink href="#" active>
            Home
          </NavbarLink> */}
          <NavLink to="/" className="px-1">
            Home
          </NavLink>
          <NavLink to="/apartment" className="px-1">
            Apartment
          </NavLink>

          <Button className="block md:hidden mt-2 cursor-pointer bg-primary dark:bg-primary hover:bg-primary/90 dark:hover:bg-primary/90">
            LogIn
          </Button>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default CustomeNavbar;
