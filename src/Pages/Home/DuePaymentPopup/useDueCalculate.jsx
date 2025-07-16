import React, { useMemo } from "react";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";
import useAptInfo from "../../../Hooks/useAptInfo";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useNavigate } from "react-router";
import { addMonths, format, isAfter } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const useDueCalculate = () => {
  const { user } = useAuth();
  const { userRole } = useUserRole();
  const { apartment } = useAptInfo();
  const axiosSecure = useAxiosSecure();
  // const [selectedMonth, setSelectedMonth] = useState("");

  const isMember = userRole?.role === "member" ? true : false;
  const today = new Date();

  // ✅ Generate all months between agreement date and today
  const allMonths = useMemo(() => {
    if (!apartment?.agreementDate) return [];
    const pre = new Date(apartment.agreementDate);
    const result = [];
    let current = pre;
    while (!isAfter(current, today)) {
      result.push(format(current, "yyyy M"));
      current = addMonths(current, 1);
    }
    return result;
  }, [apartment?.agreementDate]);

  // ✅ Get unpaid months by comparing with already paid ones
  const { data: unpaidMonths = [], isLoading: unpaidLoading } = useQuery({
    queryKey: ["unpaidMonths", user?.email],
    enabled: !!user?.email && !!apartment?.currentAgId && allMonths.length > 0,
    queryFn: async () => {
      const res = await axiosSecure.patch(
        `/pendingPayments/${user.email}/${apartment.currentAgId}`,
        { monthsArray: allMonths }
      );
      return res.data.unpaidMonths;
    },
  });
  return {
    isMember,
    hasDue: unpaidMonths.length === 0 ? false : true,
    unpaidLoading,
  };
};

export default useDueCalculate;
