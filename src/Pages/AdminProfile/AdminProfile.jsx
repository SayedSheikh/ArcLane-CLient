import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FiUser,
  FiUsers,
  FiHome,
  FiCheckCircle,
  FiClock,
  FiLock,
} from "react-icons/fi";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Loading1 from "../Loadings/Loading1";

// Color schemes
const COLORS = ["#10b981", "#f59e0b", "#ef4444"]; // Available, Pending, Booked
const USER_COLORS = ["#3b82f6", "#9333ea"]; // Normal, Member

// Stat Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center bg-white dark:bg-gray-800 shadow rounded-lg p-4">
    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {value}
      </p>
    </div>
  </div>
);

// Pie Chart Component
const PieCard = ({ title, data, colors }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center">
    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
      {title}
    </h3>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          innerRadius={40}
          paddingAngle={3}
          label>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboardStats/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading1></Loading1>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load stats.</p>
    );

  const {
    totalRooms,
    percentageAvailable,
    percentageBooked,
    percentagePending,
    totalUsers,
    totalMembers,
    totalNormalUser,
  } = stats;

  const roomPieData = [
    { name: "Available", value: percentageAvailable },
    { name: "Pending", value: percentagePending },
    { name: "Booked", value: percentageBooked },
  ];

  const userPieData = [
    { name: "Normal Users", value: totalNormalUser },
    { name: "Members", value: totalMembers },
  ];

  return (
    <section className="py-10 px-4 md:px-10 rounded-sm md:rounded-md bg-gray-50 dark:bg-gray-900 min-h-screen font-inter">
      <title>ArcLane | AdminProfile</title>
      <div className="max-w-6xl mx-auto space-y-10 ">
        {/* Admin Info */}
        <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <img
            src={
              user?.photoURL || "https://i.ibb.co/2t8Q1hF/default-avatar.png"
            }
            alt="Admin"
            className="w-24 h-24 rounded-full border-4 border-blue-500 mr-6"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {user?.displayName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard icon={<FiHome />} label="Total Rooms" value={totalRooms} />
          <StatCard
            icon={<FiCheckCircle />}
            label="Available Rooms (%)"
            value={`${percentageAvailable}%`}
          />
          <StatCard
            icon={<FiClock />}
            label="Pending Rooms (%)"
            value={`${percentagePending}%`}
          />
          <StatCard
            icon={<FiLock />}
            label="Booked Rooms (%)"
            value={`${percentageBooked}%`}
          />
          <StatCard icon={<FiUsers />} label="Total Users" value={totalUsers} />
          <StatCard
            icon={<FiUser />}
            label="Total Members"
            value={totalMembers}
          />
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PieCard
            title="Room Status Overview"
            data={roomPieData}
            colors={COLORS}
          />
          <PieCard
            title="User Distribution"
            data={userPieData}
            colors={USER_COLORS}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
