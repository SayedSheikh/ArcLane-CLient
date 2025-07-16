import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaPercent } from "react-icons/fa";
import { motion } from "motion/react";

import useAxios from "../../Hooks/useAxios";
import Loading1 from "../Loadings/Loading1";

const AllCoupons = () => {
  const Axios = useAxios();

  const {
    data: coupons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allCoupons"],
    queryFn: async () => {
      const res = await Axios.get("/coupons");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg font-medium">
        <Loading1 />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load coupons.
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 dark:text-blue-400">
        All Available Coupons
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => {
          const isActive = coupon.status === "active";

          return (
            <motion.div
              key={coupon._id}
              className={`rounded-xl p-5 border backdrop-blur-md bg-clip-padding transition-transform  
                ${
                  isActive
                    ? "bg-green-200/10 border-green-400/40 dark:border-green-300/30"
                    : "bg-red-200/10 border-red-400/40 dark:border-red-300/30"
                }`}
              whileHover={{
                scale: 1.04,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {coupon.couponCode}
                </h3>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full 
                    ${
                      isActive
                        ? "bg-green-300/30 text-green-800 dark:text-green-300"
                        : "bg-red-300/30 text-red-800 dark:text-red-300"
                    }`}>
                  {coupon.status.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {coupon.description}
              </p>

              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                <FaPercent />
                <span>{coupon.discountPercentage}% OFF</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AllCoupons;
