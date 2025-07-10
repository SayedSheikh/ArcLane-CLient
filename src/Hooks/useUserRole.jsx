import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: userRole } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);

      console.log(res.data);
      return res.data;
    },
  });
  return { userRole, roleLoading };
};

export default useUserRole;
