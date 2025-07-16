import React from "react";
import {
  FaGavel,
  FaUserShield,
  FaRegClock,
  FaCheckCircle,
} from "react-icons/fa";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700 dark:text-blue-400">
        <FaGavel className="inline mr-2 text-secondary" />
        Terms and Conditions
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center">
          <FaUserShield className="mr-2 text-blue-600 dark:text-blue-400" />
          User Responsibilities
        </h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          Users are expected to maintain accurate account information and follow
          community guidelines. Any misuse, tampering, or abuse of the platform
          may result in restricted access or permanent suspension.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center">
          <FaRegClock className="mr-2 text-blue-600 dark:text-blue-400" />
          Service Availability
        </h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          While we strive for 24/7 uptime, occasional maintenance or technical
          issues may cause temporary downtime. We appreciate your patience and
          understanding in such cases.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center">
          <FaCheckCircle className="mr-2 text-blue-600 dark:text-blue-400" />
          Acceptance of Terms
        </h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          By accessing and using our Building Management System app, you agree
          to comply with these Terms and all applicable laws and regulations.
          Violation of any terms may result in account termination.
        </p>
      </section>

      <section className="text-sm border-t pt-6 mt-10 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700">
        <p>
          These terms may be updated occasionally. Please review them regularly
          to stay informed.
        </p>
        <p className="mt-2">Last Updated: July 2025</p>
      </section>
    </div>
  );
};

export default Terms;
