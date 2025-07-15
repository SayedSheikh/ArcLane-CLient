import React from "react";
import {
  FiShield,
  FiWifi,
  FiTruck,
  FiDroplet,
  FiShoppingCart,
  FiActivity,
  FiBatteryCharging,
} from "react-icons/fi";
import { FaTree } from "react-icons/fa"; // ✅ Stable tree icon

const amenities = [
  {
    icon: <FiShield size={32} className="text-blue-500" />,
    title: "24/7 Security",
    description: "Round-the-clock security with CCTV monitoring",
  },
  {
    icon: <FiWifi size={32} className="text-blue-500" />,
    title: "High-Speed Internet",
    description: "Complimentary fiber optic internet connection",
  },
  {
    icon: <FiTruck size={32} className="text-blue-500" />,
    title: "Parking",
    description: "Dedicated parking spaces for residents",
  },
  {
    icon: <FaTree size={32} className="text-blue-500" />,
    title: "Garden Area",
    description: "Beautiful landscaped gardens and green spaces",
  },
  {
    icon: <FiActivity size={32} className="text-blue-500" />,
    title: "Fitness Center",
    description: "Fully equipped modern gym facilities",
  },
  {
    icon: <FiShoppingCart size={32} className="text-blue-500" />,
    title: "Shopping Complex",
    description: "On-site shopping and dining options",
  },
  {
    icon: <FiBatteryCharging size={32} className="text-blue-500" />,
    title: "Power Backup",
    description: "24/7 power backup with generators",
  },
  {
    icon: <FiDroplet size={32} className="text-blue-500" />,
    title: "Water Supply",
    description: "Uninterrupted water supply system",
  },
];

const Amenities = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          World-Class Amenities
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Experience unmatched comfort and convenience with our thoughtfully
          designed amenities for a luxurious lifestyle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((item, idx) => (
            <div key={idx} data-aos="flip-left">
              <div
                className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-primary/20
               transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
