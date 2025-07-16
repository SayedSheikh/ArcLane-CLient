import React from "react";
import { FiX, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router";

const DuePaymentPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    onClose(); // Hide popup before navigation
    navigate("/dashboard/payment");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-xl shadow-lg relative">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition cursor-pointer">
          <FiX size={22} />
        </button>

        {/* Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-200">
            <FiAlertCircle size={24} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Rent Payment Due
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You have outstanding rent payments. Please clear your dues to avoid
          penalties or service interruption.
        </p>

        {/* Action Button */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleProceed}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer">
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuePaymentPopup;
