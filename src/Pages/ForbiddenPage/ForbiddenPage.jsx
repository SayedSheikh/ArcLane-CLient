import React from "react";
import { useNavigate } from "react-router";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-6">
      <title>ArcLane | Forbidden</title>
      <div className="text-center max-w-md space-y-6">
        <h1 className="text-7xl font-extrabold text-indigo-600 dark:text-indigo-400">
          403
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Forbidden Access
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          You don’t have permission to view this page. Please return to the home
          page or contact the site administrator.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
