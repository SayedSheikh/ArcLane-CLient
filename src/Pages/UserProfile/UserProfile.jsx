import React from "react";
import useAuth from "../../Hooks/useAuth";
import {
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineMap,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import useAptInfo from "../../Hooks/useAptInfo";
import Loading1 from "../Loadings/Loading1";

const UserProfile = () => {
  const { user } = useAuth();
  const { apartment, aptInfoLoading } = useAptInfo();

  // const role = location?.state?.role || "";

  if (aptInfoLoading) {
    return <Loading1></Loading1>;
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-inter pt-10">
      <title>ArcLane | Profile</title>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-blue-500 h-35 flex items-center rounded-t-xl">
          {/* Profile Image */}
          <div className="px-6 md:px-12">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/2t8Q1hF/default-avatar.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-8 px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <HiOutlineMail className="text-xl shrink-0 text-gray-600 dark:text-gray-300" />
                  <span
                    title={user?.email || "Email"}
                    className="text-gray-700 dark:text-gray-200 truncate max-w-[200px]">
                    {user?.email || "Email"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <HiOutlineCalendar className="text-xl text-gray-600 dark:text-gray-300 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium">Agreement Date:</span>{" "}
                    {apartment === "none"
                      ? "None"
                      : new Date(apartment.agreementDate).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Apartment Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Apartment Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <HiOutlineHome className="text-xl text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium">Floor:</span>{" "}
                    {apartment === "none" ? "None" : apartment.floorNo}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <HiOutlineMap className="text-xl text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium">Block & Apartment:</span>{" "}
                    {apartment === "none" ? "None" : apartment.apartmentNo}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <HiOutlineCurrencyDollar className="text-xl text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium">Monthly Rent:</span>{" "}
                    {apartment === "none"
                      ? "None"
                      : apartment.rent.toLocaleString() + "$"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
