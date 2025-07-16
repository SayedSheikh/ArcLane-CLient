import React from "react";
import {
  FaShieldAlt,
  FaUserSecret,
  FaDatabase,
  FaUserCheck,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700 dark:text-blue-400">
        <FaShieldAlt className="inline mr-2 text-secondary" />
        Privacy Policy
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center">
          <FaUserSecret className="mr-2 text-blue-600 dark:text-blue-400" />
          Your Privacy Matters
        </h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          We take your privacy seriously. Our system is built to protect your
          personal and property-related data with the highest standards of
          security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center">
          <FaDatabase className="mr-2 text-blue-600 dark:text-blue-400" />
          Data Collection
        </h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          We only collect essential data, such as user identity, unit details,
          and communication logs, to ensure smooth building management. No
          sensitive financial information is stored.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center">
          <FaUserCheck className="mr-2 text-blue-600 dark:text-blue-400" />
          User Control
        </h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          You can update your personal information, manage communication
          preferences, or request data deletion at any time from your account
          dashboard.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center">
          <FaShieldAlt className="mr-2 text-blue-600 dark:text-blue-400" />
          Data Protection
        </h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          We use encryption, firewalls, and role-based access control to protect
          your data. All data is hosted securely and regularly backed up.
        </p>
      </section>

      <section className="text-sm border-t pt-6 mt-10 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700">
        <p>
          This privacy policy may be updated periodically. You will be notified
          about significant changes via in-app notifications or email.
        </p>
        <p className="mt-2">Last Updated: July 2025</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
