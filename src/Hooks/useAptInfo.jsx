import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useUserRole from "./useUserRole";

const useAptInfo = () => {
  const { user, loading } = useAuth();
  const { userRole } = useUserRole();
  const role = userRole?.role;
  const axiosSecure = useAxiosSecure();

  const { data: apartment = "none", isLoading: aptInfoLoading } = useQuery({
    queryKey: ["apartmentInfo", user?.email],
    enabled: role === "member" && !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`memberApartment/${user?.email}`);

      return res.data;
    },
  });
  return {
    apartment,
    aptInfoLoading,
  };
};

export default useAptInfo;
