import React from "react";
import useAuth from "../../Hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-inter">
      {/* Heading outside card */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          My Profile
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          Review your profile and apartment details below.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 space-y-8">
        {/* User Info Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Profile image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow shrink-0 mx-auto">
            <img
              src={
                user?.photoURL || "https://i.ibb.co/2t8Q1hF/default-avatar.png"
              }
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          {/* User text info */}
          <div className="flex flex-col justify-center gap-3 text-base w-full">
            <p className="text-gray-700 dark:text-gray-300 text-center md:text-start">
              <span className="font-semibold">Name:</span>{" "}
              {user?.displayName || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-center md:text-start">
              <span className="font-semibold">Email:</span>{" "}
              {user?.email || "N/A"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 dark:border-gray-700" />

        {/* Apartment Info Section */}
        <div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-5">
            Apartment Information
          </h4>

          <div className="grid sm:grid-cols-2 gap-2 text-base">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Agreement Date:</span> None
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Floor No:</span> None
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Block:</span> None
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Room Number:</span> None
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
