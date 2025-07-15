import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FiMail, FiMessageCircle } from "react-icons/fi";
import { Button, Spinner } from "flowbite-react";

const ContactUs = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_serviceId, // Replace with your EmailJS service ID
        import.meta.env.VITE_templateId, // Replace with your EmailJS template ID
        formRef.current,
        import.meta.env.VITE_publicId // Replace with your EmailJS public key
      )
      .then(
        () => {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "We’ll get back to you soon.",
            confirmButtonText: "OK",
            background: "#1f2937", // Dark background for dark mode
            color: "#fff",
          }).then(() => {
            navigate("/");
          });
        },
        () => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong. Please try again later.",
            confirmButtonText: "OK",
            background: "#1f2937",
            color: "#fff",
          });
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
          Contact Us
        </h2>
        <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
            <FiMail className="text-indigo-500 mr-2" />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 outline-none"
            />
          </div>

          <div className="flex items-start border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700">
            <FiMessageCircle className="text-indigo-500 mt-1 mr-2" />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 outline-none resize-none"></textarea>
          </div>

          {loading ? (
            <Button className="w-full">
              <Spinner aria-label="Spinner button example" size="sm" light />
              <span className="pl-3">Loading...</span>
            </Button>
          ) : (
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              Send Message
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
