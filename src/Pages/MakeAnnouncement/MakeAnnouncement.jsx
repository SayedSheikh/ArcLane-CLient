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
    <div className="max-w-3xl mt-20 mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl border border-primary/50 font-inter">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Make an Announcement
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <FaBullhorn className="text-blue-500" />
              <span>Title</span>
            </div>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={announcement.title}
            onChange={handleChange}
            placeholder="Enter announcement title"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <FaAlignLeft className="text-blue-500" />
              <span>Description</span>
            </div>
          </label>
          <textarea
            id="description"
            name="description"
            value={announcement.description}
            onChange={handleChange}
            rows="5"
            placeholder="Enter announcement details"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 ${
            isPending ? "opacity-60 cursor-not-allowed" : ""
          }`}>
          {isPending ? "Posting..." : "Post Announcement"}
        </button>
      </form>

      {isError && (
        <p className="text-red-500 mt-4 text-center">
          {error?.message || "Failed to post announcement"}
        </p>
      )}
    </div>
  );
};

export default MakeAnnouncement;
