import React from "react";
import { useNavigate } from "react-router";
import { FiArrowLeftCircle } from "react-icons/fi";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black transition-colors">
      <title>ArcLane | Error</title>
      <div className="text-center p-8 max-w-md">
        <img
          src="/error-eye.gif"
          alt="Error Illustration"
          className="w-full max-w-xs mx-auto mb-6"
        />

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Oops! Page Not Found
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={handleHomeRedirect}
          className="inline-flex items-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer">
          <FiArrowLeftCircle className="mr-2 text-lg" />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
