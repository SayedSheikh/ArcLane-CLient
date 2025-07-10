import React, { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const useAuth = () => {
  const userInfo = use(AuthContext);

  return userInfo;
};

export default useAuth;
