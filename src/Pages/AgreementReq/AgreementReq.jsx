import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button } from "flowbite-react";
import Swal from "sweetalert2";
import Loading2 from "../Loadings/Loading2";
import {
  FaCalendarAlt,
  FaCheck,
  FaDollarSign,
  FaMapMarkerAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const AgreementReq = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [width, setWidth] = useState(window.innerWidth);
  const [actionLoading, setActionLoading] = useState(null); // Track loading state per request

  useEffect(() => {
    const widthResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", widthResize);
    return () => window.removeEventListener("resize", widthResize);
  }, []);

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agreements", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(`/agreements/${user?.email}`);
      return result.data;
    },
  });

  const handleAction = async (agreementId, userEmail, actionType) => {
    setActionLoading(agreementId);

    const confirm = await Swal.fire({
      title: `Are you sure to ${actionType}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionType}`,
      confirmButtonColor: actionType === "accept" ? "#2563eb" : "#dc2626",
    });

    if (!confirm.isConfirmed) {
      setActionLoading(null);
      return;
    }

    try {
      const res = await axiosSecure.patch(
        `/updateAgStatus/${user?.email}/${agreementId}?actionType=${actionType}`
      );

      if (res?.data?.modifiedCount > 0) {
        Swal.fire(
          "Success!",
          `Request ${actionType}ed successfully`,
          "success"
        );
        refetch();
      } else {
        Swal.fire("Failed!", "Something went wrong.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Server error occurred.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", { dateStyle: "medium" });

  if (isLoading) {
    return (
      <div className="p-4 max-w-[1200px] mx-auto">
        <Loading2 />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 font-inter">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No Pending Requests
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          All agreement requests have been processed.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-w-[1200px] mx-auto font-inter">
      <h2 className="text-3xl font-bold text-center dark:text-white">
        Agreement Requests
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        Review and manage apartment agreement requests.
      </p>
      <p className="text-base text-secondary">
        Pending Requests: {requests.length}
      </p>

      {width > 950 ? (
        <div className="overflow-x-auto rounded-md border border-primary/50 shadow-md bg-white dark:bg-gray-900 mt-6">
          <table className="w-full min-w-[900px] text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="text-xs uppercase bg-blue-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Floor</th>
                <th className="px-4 py-3">Block</th>
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Rent</th>
                <th className="px-4 py-3">Requested</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr
                  key={req._id}
                  className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{req.reqUser}</td>
                  <td className="px-4 py-3">{req.reqEmail}</td>
                  <td className="px-4 py-3">{req.floorNo}</td>
                  <td className="px-4 py-3">{req.blockName}</td>
                  <td className="px-4 py-3">{req.apartmentNo}</td>
                  <td className="px-4 py-3">৳ {req.rent.toLocaleString()}</td>
                  <td className="px-4 py-3">{formatDate(req.reqDate)}</td>
                  <td className="px-4 py-3 space-x-2 flex">
                    <Button
                      className="cursor-pointer"
                      size="xs"
                      color="blue"
                      disabled={actionLoading === req._id}
                      onClick={() =>
                        handleAction(req._id, req.reqEmail, "accept")
                      }>
                      {actionLoading === req._id ? "Processing..." : "Accept"}
                    </Button>
                    <Button
                      className="cursor-pointer"
                      size="xs"
                      color="red"
                      disabled={actionLoading === req._id}
                      onClick={() =>
                        handleAction(req._id, req.reqEmail, "reject")
                      }>
                      {actionLoading === req._id ? "Processing..." : "Reject"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaUser className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {req.reqUser}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {req.reqEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>
                    Floor {req.floorNo}, Block {req.blockName}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="h-4 w-4 mr-2 flex items-center justify-center">
                    🏠
                  </span>
                  <span>Room {req.apartmentNo}</span>
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="mr-2" />
                  <span className="text-green-600 font-semibold">
                    ৳ {req.rent.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>Requested on {formatDate(req.reqDate)}</span>
                </div>
              </div>

              <div className="flex gap-3 flex-col sm:flex-row">
                <button
                  onClick={() => handleAction(req._id, req.reqEmail, "accept")}
                  disabled={actionLoading === req._id}
                  className={`flex-1 flex items-center justify-center px-4 py-2 text-white rounded-lg transition duration-200 cursor-pointer ${
                    actionLoading === req._id
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}>
                  <FaCheck className="h-4 w-4 mr-2" />
                  {actionLoading === req._id ? "Processing..." : "Accept"}
                </button>
                <button
                  onClick={() => handleAction(req._id, req.reqEmail, "reject")}
                  disabled={actionLoading === req._id}
                  className={`flex-1 flex items-center justify-center px-4 py-2 text-white rounded-lg transition duration-200 cursor-pointer ${
                    actionLoading === req._id
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}>
                  <FaTimes className="h-4 w-4 mr-2" />
                  {actionLoading === req._id ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgreementReq;
