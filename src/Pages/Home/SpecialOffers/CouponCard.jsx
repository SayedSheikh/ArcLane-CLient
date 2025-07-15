import React from "react";
import toast from "react-hot-toast";
import { FiTag, FiClock } from "react-icons/fi";

const CouponCard = ({ code, discount, description }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied!");
  };

  return (
    <div data-aos="zoom-in">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105 relative overflow-hidden">
        <div className="flex items-start gap-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 w-fit rounded-full mb-2">
          <span> {discount}% OFF</span>
        </div>

        <div className="bg-[#DFE9FD] h-30 w-30 flex items-end justify-start rounded-full absolute -top-[50%] translate-y-1/2  right-5 translate-x-1/2 ">
          <FiTag className="text-[26px] relative translate-x-8 -translate-y-6 text-gray-500" />
        </div>

        <h3 className="text-xl text-start font-semibold text-gray-900 dark:text-white mb-1 font-mono">
          {code}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm  my-4 text-start mb-3">
          {description}
        </p>

        <button
          onClick={handleCopy}
          className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-1.5 px-4 rounded transition-all cursor-pointer">
          Copy Code
        </button>
      </div>
    </div>
  );
};

export default CouponCard;
