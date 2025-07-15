import React, { useState } from "react";
import { FaBullhorn, FaCalendarAlt, FaUserTie } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import { format } from "date-fns";
import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading2 from "../Loadings/Loading2";

// const announcementsData = [
//   {
//     id: 1,
//     title: "Monthly Maintenance Fee Due",
//     description:
//       "Dear residents, please be reminded that the monthly maintenance fee is due by the 10th of this month. Kindly ensure timely payment to avoid late charges.",
//     date: "2025-07-09T00:00:00.000Z",
//     postedBy: "Building Owner",
//   },
//   {
//     id: 2,
//     title: "Water Supply Interruption",
//     description:
//       "Due to maintenance work, water supply will be interrupted on 8th July from 9 AM to 4 PM. Please store enough water beforehand.",
//     date: "2025-07-09T00:00:00.000Z",
//     postedBy: "Building Owner",
//   },
//   {
//     id: 3,
//     title: "Elevator Inspection",
//     description:
//       "All elevators will undergo routine inspection on 12th July. Expect temporary service interruptions during the inspection hours (10 AM - 1 PM).",
//     date: "2025-07-09T00:00:00.000Z",
//     postedBy: "Building Owner",
//   },
//   {
//     id: 4,
//     title: "Fire Drill Notification",
//     description:
//       "A mandatory fire drill will be conducted on 15th July at 3 PM. Please participate and follow the safety instructions carefully.",
//     date: "2025-07-09T00:00:00.000Z",
//     postedBy: "Building Owner",
//   },
//   {
//     id: 5,
//     title: "Parking Area Cleaning",
//     description:
//       "The parking area will be cleaned on 18th July. Ensure your vehicle is moved by 8 AM to avoid inconvenience.",
//     date: "2025-07-09T00:00:00.000Z",
//     postedBy: "Building Owner",
//   },
// ];

const Announcements = () => {
  const count = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const dataPerPage = 3;
  const NumberOfPages = Math.ceil(count.data.count / dataPerPage);

  const pages = [...Array(NumberOfPages).keys()];
  const [currentPage, setCurrentPage] = useState(1);

  const { data: announcementsData, isLoading } = useQuery({
    queryKey: ["announcements", currentPage],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/announcements/${user?.email}?currentPage=${
          currentPage - 1
        }&dataPerPage=${dataPerPage}`
      );
      return res.data;
    },
  });

  const toDateFormat = (date) => {
    const formattedDate = new Date(date);
    return formattedDate;
  };
  const handlePageClick = (i) => {
    setCurrentPage(i + 1);
  };
  return (
    <div className="max-w-5xl mx-auto px-6 py-5 font-inter">
      <div className="text-center mb-8 ">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 dark:text-white flex items-center justify-center gap-3">
          <FaBullhorn className="text-indigo-500 shrink-0 hidden sm:block" />{" "}
          Announcements
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Stay informed with important updates from your building owner
        </p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div>
            <Loading2></Loading2>
          </div>
        ) : (
          announcementsData?.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white dark:bg-gray-900 border border-indigo-200 dark:border-gray-700 shadow rounded-lg p-6  hover:shadow-md transition">
              <div className="flex md:items-center md:justify-between mb-3 flex-col md:flex-row items-start">
                <h3 className="md:text-xl text-base font-semibold text-primary dark:text-indigo-400 flex items-start md:items-center gap-2 ">
                  <MdAnnouncement className="text-2xl w-6 shrink-0" />{" "}
                  {announcement.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                  <FaCalendarAlt />{" "}
                  {format(toDateFormat(announcement.date), "PPP")}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {announcement.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaUserTie className="text-primary" />
                {announcement.postedBy}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-9">
        {pages?.map((i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-primary hover:text-white text-gray-900 dark:text-gray-100 transition cursor-pointer text-sm ${
              currentPage - 1 === i
                ? "bg-primary text-white"
                : "bg-white dark:bg-gray-800"
            }`}
            onClick={() => handlePageClick(i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
