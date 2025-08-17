import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAptInfo from "../../Hooks/useAptInfo";
import Loading1 from "../Loadings/Loading1";
import {
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineMap,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Colors for chart
const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444"];

// Reusable custom Card
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
    {children}
  </h2>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`text-gray-700 dark:text-gray-300 ${className}`}>
    {children}
  </div>
);

const UserOverview = () => {
  const { user } = useAuth();
  const { apartment, aptInfoLoading } = useAptInfo();

  if (aptInfoLoading) {
    return <Loading1 />;
  }

  const rent = apartment === "none" ? 0 : apartment.rent;

  // Example chart data
  const remainingBudget = Math.max(0, 5000 - rent - 1000);

  const data = [
    { name: "Rent", value: rent },
    { name: "Other Expenses", value: 1000 },
    { name: "Remaining Budget", value: remainingBudget },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-inter text-gray-900 dark:text-gray-200">
      <title>ArcLane | Overview</title>

      {/* Page Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          User Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          A quick glance at your apartment and personal info
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* Profile Card */}
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/2t8Q1hF/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-14 h-14 rounded-full border shadow"
                />
                <span className="text-lg">{user?.displayName || "User"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <HiOutlineMail className="text-lg text-gray-500" />
                  {user?.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HiOutlineCalendar className="text-lg text-gray-500" />
                  Agreement:{" "}
                  {apartment === "none"
                    ? "None"
                    : new Date(apartment.agreementDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Apartment Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Apartment Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <HiOutlineHome className="text-lg text-gray-500" />
                Floor: {apartment === "none" ? "None" : apartment.floorNo}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <HiOutlineMap className="text-lg text-gray-500" />
                Block & Apt:{" "}
                {apartment === "none" ? "None" : apartment.apartmentNo}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <HiOutlineCurrencyDollar className="text-lg text-gray-500" />
                Rent:{" "}
                {apartment === "none"
                  ? "None"
                  : `$${apartment.rent.toLocaleString()}`}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rent Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Rent & Expenses</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserOverview;
