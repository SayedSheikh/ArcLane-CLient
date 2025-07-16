import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import useAxios from "../../../Hooks/useAxios";
import CouponCard from "./CouponCard";
import { FaGift } from "react-icons/fa";
import { Link } from "react-router";

const SpecialOffers = () => {
  const axios = useAxios();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    enabled: true,
    queryFn: async () => {
      const res = await axios.get("/coupons");
      return res.data;
    },
  });

  const updatedData = useMemo(() => {
    if (!coupons?.length) return [];
    return [...coupons]
      .filter((item) => item.status === "active")
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 4);
  }, [coupons]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <section className="bg-secondary/4 dark:bg-gray-900 py-16 px-4 font-inter">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold   mb-2 flex items-center justify-center gap-2 text-primary">
          <FaGift className="text-secondary" />
          Special Offers
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
          Take advantage of our exclusive discounts and save on your rent
          payments
        </p>

        {/* Coupon Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {updatedData.map((coupon) => (
            <CouponCard
              key={coupon._id}
              code={coupon.couponCode}
              discount={coupon.discountPercentage}
              description={coupon.description}
            />
          ))}
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Have a coupon code? Apply it during payment to get instant savings!
          </p>
          <Link
            to="/allCoupons"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium px-6 py-2 rounded hover:opacity-90 transition cursor-pointer">
            View All Offers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
