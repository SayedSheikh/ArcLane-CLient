import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaBullhorn, FaAlignLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
  });

  const {
    mutateAsync: submitAnnouncement,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (newAnnouncement) => {
      const res = await axiosSecure.post(
        `/announcements/${user?.email}`,
        newAnnouncement
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Posted!",
          text: "Announcement has been posted.",
          timer: 1500,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["announcements"]);
        setAnnouncement({ title: "", description: "" });
      }
    },
    onError: () => {
      Swal.fire("Error!", "Failed to post announcement.", "error");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!announcement.title || !announcement.description) {
      Swal.fire("Oops!", "Both fields are required!", "warning");
      return;
    }

    const confirm = await Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to post this announcement?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Post",
    });

    if (!confirm.isConfirmed) return;

    const date = new Date().toISOString();
    const data = {
      ...announcement,
      date,
      postedBy: "Building Owner",
    };

    await submitAnnouncement(data);
  };

  return (
    <div className="py-12 px-4 sm:px-8 md:px-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-8">
          📣 Make an Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <FaBullhorn className="text-blue-600" />
                Title
              </div>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={announcement.title}
              onChange={handleChange}
              placeholder="Exciting news or important update..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <FaAlignLeft className="text-blue-600" />
                Description
              </div>
            </label>
            <textarea
              id="description"
              name="description"
              value={announcement.description}
              onChange={handleChange}
              rows="5"
              placeholder="Provide details of the announcement here..."
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-200 ${
              isPending ? "opacity-60 cursor-not-allowed" : ""
            }`}>
            {isPending ? "Posting..." : "Post Announcement"}
          </button>

          {isError && (
            <p className="text-center text-red-600 font-medium">
              {error?.message || "Something went wrong."}
            </p>
          )}
        </form>
      </div>

      {/* Preview Box */}
      <div className="max-w-3xl mx-auto mt-8 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 p-4 rounded-lg">
        <title>ArcLane | Make Announcement</title>
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
          🔎 Preview
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          This announcement will be visible to all residents on their
          dashboards. Ensure it's clear, concise, and helpful.
        </p>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
