import React from "react";
import { motion } from "motion/react";
import { FaBuilding, FaUsers, FaLock, FaChartLine } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-16 px-6 md:px-12 lg:px-20 mt-10 font-inter">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          About Arclane
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Arclane is a modern{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Building Management Web App
          </span>{" "}
          designed to make apartment and tenant management seamless, secure, and
          efficient. Our mission is to bridge the gap between{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Admins, Members, and Users
          </span>{" "}
          with a centralized platform for payments, communication, and property
          management.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {[
          {
            icon: <FaBuilding className="text-blue-600 text-4xl" />,
            title: "Smart Property Management",
            desc: "Manage apartments, availability, and bookings in one unified dashboard.",
          },
          {
            icon: <FaUsers className="text-green-600 text-4xl" />,
            title: "Role-Based Dashboards",
            desc: "Admins, Members, and Users enjoy tailored experiences with secure access.",
          },
          {
            icon: <FaLock className="text-purple-600 text-4xl" />,
            title: "Secure & Reliable",
            desc: "JWT authentication, Firebase integration, and Stripe ensure robust security.",
          },
          {
            icon: <FaChartLine className="text-orange-600 text-4xl" />,
            title: "Insights & Payments",
            desc: "Track payments, use coupons, and view statistics with interactive charts.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg p-6 flex flex-col items-center text-center">
            {feature.icon}
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto mt-20 bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          At Arclane, we believe managing a building should be as easy as
          managing a community. Our platform empowers admins to streamline
          operations, members to stay on top of their rent and communication,
          and users to discover their future homes. With cutting-edge
          technology, secure authentication, and real-time updates, Arclane is
          redefining the way buildings are managed in the digital age.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutUs;
