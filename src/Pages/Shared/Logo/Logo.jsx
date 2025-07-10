import React from "react";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} className="flex cursor-pointer">
      <img src="/logo-building.png" className="w-18" alt="" />
      <span className="whitespace-nowrap text-[26px] dark:text-white font-fjalla self-end -ml-1 -mb-1 font-normal">
        ArcLane
      </span>
    </div>
  );
};

export default Logo;
