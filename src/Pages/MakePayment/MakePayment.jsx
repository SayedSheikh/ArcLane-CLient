import React, { useState, useMemo } from "react";
import { Button, Select } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { addMonths, format, isAfter } from "date-fns";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import useAptInfo from "../../Hooks/useAptInfo";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading1 from "../Loadings/Loading1";
import { useNavigate } from "react-router";

const MakePayment = () => {
  const { user, loading } = useAuth();
  const { roleLoading } = useUserRole();
  const { apartment, aptInfoLoading } = useAptInfo();
  const axiosSecure = useAxiosSecure();
  const [selectedMonth, setSelectedMonth] = useState("");

  const navigate = useNavigate();

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
      return res.data.unpaidMonths || [];
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMonth) return alert("Please select a month to pay.");

    const formData = {
      selectedMonth,
      memberEmail: user?.email,
      floor: apartment?.floorNo,
      blockName: apartment?.blockName,
      apartmentNo: apartment?.apartmentNo,
      rent: apartment?.rent,
    };

    navigate("/dashboard/paymentPage", { state: { formData } });
  };

  if (loading || roleLoading || aptInfoLoading || unpaidLoading) {
    return <Loading1 />;
  }

  return (
    <div className="">
      <div className="max-w-xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg font-inter mt-10 border border-primary/30">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Make Payment
        </h2>

        {unpaidMonths.length === 0 ? (
          <div className="text-center text-green-600 dark:text-green-400 text-lg font-medium py-10">
            <span className="text-2xl">🎉</span> You have no due months. Great
            job!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300">
                Member Email
              </label>
              <input
                type="text"
                value={user?.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300">
                  Floor
                </label>
                <input
                  type="text"
                  value={apartment?.floorNo || "N/A"}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300">
                  Block
                </label>
                <input
                  type="text"
                  value={apartment?.blockName || "N/A"}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300">
                Room No
              </label>
              <input
                type="text"
                value={apartment?.apartmentNo || "N/A"}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300">
                Rent
              </label>
              <input
                type="text"
                value={`${apartment?.rent?.toLocaleString() + "$" || "0"}`}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Select Month
              </label>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                required>
                <option value="">Select a month</option>
                {unpaidMonths.map((month) => (
                  <option key={month} value={month}>
                    {format(new Date(month), "MMMM yyyy")}
                  </option>
                ))}
              </Select>
            </div>

            <Button
              type="submit"
              color="blue"
              className="w-full mt-4"
              disabled={!selectedMonth}>
              Pay Now
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MakePayment;
