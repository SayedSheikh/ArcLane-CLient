import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import "./navbar.css";
import Logo from "../Logo/Logo";
import CustomAvatar from "../Avatar/CustomAvatar";
import useAuth from "../../../Hooks/useAuth";

const CustomeNavbar = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const { user } = useAuth();

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            title="Toggle dark mode">
            {theme === "dark" ? (
              <FaSun className="text-xl text-gray-800 dark:text-white cursor-pointer"></FaSun>
            ) : (
              <FaMoon className="text-xl text-gray-800 dark:text-white cursor-pointer" />
            )}
          </button>

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
          <NavLink to="/appartment" className="px-1">
            Appartment
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
