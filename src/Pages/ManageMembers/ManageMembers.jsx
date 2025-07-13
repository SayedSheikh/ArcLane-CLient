import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import { Button } from "flowbite-react";
import Swal from "sweetalert2";
import Loading2 from "../Loadings/Loading2";
import { format } from "date-fns";

const ManageMembers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const numberOfUsers = useLoaderData();
  const [totalData, setTotalData] = useState(numberOfUsers.data);
  const [removingId, setRemovingId] = useState(null); // NEW

  const dataPerPage = 10;
  const numberOfPages = Math.ceil(totalData / dataPerPage);
  const pagesArray = [...Array(numberOfPages).keys()];
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["members", user?.email, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${user?.email}?currentPage=${
          currentPage - 1
        }&dataPerPage=${dataPerPage}&memberReq=memberReq`
      );
      return res.data;
    },
  });

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently remove the member.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setRemovingId(id); // SET LOADING
          const res = await axiosSecure.patch(`/remove/${user.email}/${id}`);
          if (res.data?.modifiedCount > 0) {
            Swal.fire("Removed!", "The member has been removed.", "success");
            setTotalData((prev) => prev - 1); // update count
            refetch(); // refetch updated data
          } else {
            Swal.fire("Error", "Failed to remove the member.", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Something went wrong.", "error");
        } finally {
          setRemovingId(null); // RESET LOADING
        }
      }
    });
  };

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
        Members List
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        Browse all members with their activity and account details.
      </p>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Loading2 />
        </div>
      ) : users.length === 0 ? (
        <p className="text-center py-10 text-gray-700 dark:text-gray-300 text-lg">
          No member found.
        </p>
      ) : (
        <div className="overflow-x-auto mt-10 rounded-lg border border-primary/50 shadow-md bg-white max-w-[1000px] dark:bg-gray-900 mx-auto">
          <table className="w-full min-w-[800px] text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="text-xs uppercase bg-blue-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Last Login</th>
                <th className="px-4 py-3">Action</th>
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
                      alt="member"
                      className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3">{userItem.username}</td>
                  <td className="px-4 py-3">{userItem.email}</td>
                  <td className="px-4 py-3">
                    {format(formatDate(userItem.lastLogin), "PPpp")}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      className="bg-primary cursor-pointer"
                      onClick={() => handleRemove(userItem._id)}
                      disabled={removingId === userItem._id}>
                      {removingId === userItem._id ? "Removing..." : "Remove"}
                    </Button>
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

export default ManageMembers;
