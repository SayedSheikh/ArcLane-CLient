import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Loading2 from "../Loadings/Loading2";
import { format } from "date-fns";

const UsersList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const numberOfUsers = useLoaderData();

  const dataPerPage = 10;
  const numberOfPages = Math.ceil(numberOfUsers.data / dataPerPage);
  const pagesArray = [...Array(numberOfPages).keys()];

  const [currentPage, setCurrentPage] = useState(1);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", user?.email, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${user?.email}?currentPage=${
          currentPage - 1
        }&dataPerPage=${dataPerPage}`
      );
      return res.data;
    },
  });

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
        Users List
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        Browse all registered users with their activity and account details.
      </p>

      {/* Table Section */}
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Loading2 />
        </div>
      ) : users.length === 0 ? (
        <p className="text-center py-10 text-gray-700 dark:text-gray-300 text-lg">
          No users found.
        </p>
      ) : (
        <div className="overflow-x-auto mt-10 rounded-lg border border-primary/50 shadow-md bg-white max-w-[1000px] dark:bg-gray-900 mx-auto">
          <table className="w-full min-w-[800px] text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="text-xs uppercase bg-blue-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Last Login</th>
                <th className="px-4 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userItem, idx) => (
                <tr
                  key={userItem._id}
                  className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-3 font-medium">
                    {(currentPage - 1) * dataPerPage + idx + 1}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={userItem.imgUrl}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3">{userItem.username}</td>
                  <td className="px-4 py-3 font-semibold capitalize">
                    <span
                      className={`px-2 py-1 text-xs rounded-md outline-1 ${
                        userItem.role === "admin"
                          ? "bg-blue-100 text-blue-700 outline-blue-700"
                          : userItem.role === "member"
                          ? "bg-green-100 text-green-700 outline-green-700"
                          : "bg-gray-200 text-gray-700 outline-gray-700"
                      }`}>
                      {userItem.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">{userItem.email}</td>
                  <td className="px-4 py-3">
                    {format(formatDate(userItem.lastLogin), "PPpp")}
                  </td>
                  <td className="px-4 py-3">
                    {/* {formatDate(userItem.createdAt)} */}
                    {format(formatDate(userItem.createdAt), "PPpp")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 flex-wrap gap-2">
        {pagesArray.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum + 1)}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold border transition-all cursor-pointer ${
              currentPage === pageNum + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white text-gray-800 hover:bg-blue-100 dark:hover:bg-gray-600"
            }`}>
            {pageNum + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
