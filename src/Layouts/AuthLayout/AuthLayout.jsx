import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";

const colorClasses = [
  "text-cyan-400",
  "text-rose-400",
  "text-orange-400",
  "text-lime-400",
  "text-amber-400",
  "text-teal-300",
];

const AuthLayout = () => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorClasses.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex ">
      <div className="w-full md:w-1/2">
        <Outlet />
      </div>
      <div className="md:w-1/2 hidden md:flex flex-col items-center justify-center bg-[#0B253C] text-white px-6 text-center font-inter">
        <img src="/auth4.png" className="max-w-[250px] mb-6" alt="Building" />
        <h2 className="text-3xl font-bold mb-2">Welcome to Arclane</h2>
        <p className="text-sm md:text-base text-gray-300 max-w-2xl">
          Access your apartment services, stay updated with announcements, and
          connect with your community{" "}
          <span
            className={`font-bold text-2xl font-dancing ${colorClasses[colorIndex]} transition-colors duration-500`}>
            — all in one place
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
