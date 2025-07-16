import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading1 from "../Loadings/Loading1";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import { MdOutlinePayment } from "react-icons/md";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: paymentHistory = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      return res.data;
    },
  });

  // Chart data transformation
  const chartData = paymentHistory.map((item) => ({
    month: format(new Date(item.selectedMonth), "MMM yyyy"),
    amount: parseFloat(item.rent),
  }));

  if (isLoading) return <Loading1 />;
  if (isError) {
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        Error loading payment history: {error?.message || "Unknown error"}
      </div>
    );
  }

  if (!paymentHistory.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-16 text-center px-4">
        <MdOutlinePayment className="text-6xl text-primary dark:text-indigo-400 mb-4 animate-bounce" />
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          No Payment History Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          It looks like you haven't made any payments yet. Once a payment is
          made, your payment history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <title>ArcLane | Payment History</title>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Payment History
      </h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-primary/30 bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm uppercase font-medium">
            <tr>
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-left">Transaction ID</th>
              <th className="px-4 py-3 text-center">Rent</th>
              <th className="px-4 py-3 text-center">Card Type</th>
              <th className="px-4 py-3 text-center">Coupon</th>
              <th className="px-4 py-3 text-center">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
            {paymentHistory.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-3 whitespace-nowrap">
                  {format(new Date(item.selectedMonth), "MMMM yyyy")}
                </td>
                <td
                  className="px-4 py-3 max-w-[200px] truncate"
                  title={item.trasactionId}>
                  {item.trasactionId}
                </td>
                <td className="px-4 py-3 text-center font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.rent}$
                </td>
                <td className="px-4 py-3 text-center">
                  {item.cardType || "N/A"}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.couponUsed ? (
                    <span className="bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                      {item.couponUsed}
                    </span>
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.paymentData
                    ? format(new Date(item.paymentData), "PPP")
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-primary/30 mt-14">
        <h3 className="text-xl font-semibold mb-4 text-secondary">
          Monthly Payment Summary
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentHistory;
