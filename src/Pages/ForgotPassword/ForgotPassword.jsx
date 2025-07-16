import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiMail } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      return Swal.fire("Oops!", "Please enter your email address.", "warning");
    }

    setLoading(true);
    resetPassword(email)
      .then(() => {
        setLoading(false);
        setEmail("");

        Swal.fire({
          title: "Password Reset Email Sent!",
          text: "Check your inbox and follow the link to reset your password.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#2563eb",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire(
          "Error",
          error.message || "Failed to send reset link",
          "error"
        );
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm">
          No worries! Enter your email address and we'll send you a link to
          reset your password.
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Email Address
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
              <FiMail className="text-gray-400 text-lg mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200 cursor-pointer ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="w-fit mx-auto text-md hover:underline flex items-center justify-center gap-1 text-gray-600 dark:text-gray-300">
            <FaArrowLeft /> Back to Login
          </Link>
        </div>

        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
