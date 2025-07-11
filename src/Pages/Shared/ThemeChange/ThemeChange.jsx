import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeChange = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
      title="Toggle dark mode">
      {theme === "dark" ? (
        <FaSun className="text-xl text-gray-800 dark:text-white cursor-pointer"></FaSun>
      ) : (
        <FaMoon className="text-xl text-gray-800 dark:text-white cursor-pointer" />
      )}
    </button>
  );
};

export default ThemeChange;
