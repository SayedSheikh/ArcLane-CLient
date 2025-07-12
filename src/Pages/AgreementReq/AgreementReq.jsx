import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button } from "flowbite-react";
import Swal from "sweetalert2";
import Loading2 from "../Loadings/Loading2";

const AgreementReq = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [width, setWidth] = useState(window.innerWidth);

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
    const confirm = await Swal.fire({
      title: `Are you sure to ${actionType}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionType}`,
      confirmButtonColor: actionType === "accept" ? "#2563eb" : "#dc2626",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/agreements/${agreementId}`, {
          action: actionType,
          userEmail,
        });

        if (res.data?.modifiedCount > 0) {
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
      }
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
      <p className="text-center py-8 dark:text-white">
        No agreement requests found.
      </p>
    );
  }

  return (
    <div className="p-4 space-y-4 max-w-[1200px] mx-auto">
      <h2 className="text-3xl font-bold text-center dark:text-white">
        Agreement Requests
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300">
        Review and manage apartment agreement requests.
      </p>

      {width > 950 ? (
        // Table View
        <div className="overflow-x-auto rounded-lg border border-primary/50 shadow-md bg-white dark:bg-gray-900 mt-6">
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
                  <td className="px-4 py-3"> {req.rent.toLocaleString()}$</td>
                  <td className="px-4 py-3">{formatDate(req.reqDate)}</td>
                  <td className="px-4 py-3 space-x-2 flex">
                    <Button
                      className="cursor-pointer"
                      size="xs"
                      color="blue"
                      onClick={() =>
                        handleAction(req._id, req.email, "accept")
                      }>
                      Accept
                    </Button>
                    <Button
                      className="cursor-pointer"
                      size="xs"
                      color="red"
                      onClick={() =>
                        handleAction(req._id, req.email, "reject")
                      }>
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card View for smaller widths
        <div className="space-y-4 mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {requests.map((req, idx) => (
            <div
              key={req._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border border-gray-300 dark:border-gray-700 h-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    {req.reqUser}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {req.reqEmail}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  #{idx + 1}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3 text-gray-700 dark:text-gray-300 text-sm">
                <div>
                  <span className="font-semibold">Floor:</span> {req.floorNo}
                </div>
                <div>
                  <span className="font-semibold">Block:</span> {req.blockName}
                </div>
                <div>
                  <span className="font-semibold">Room:</span> {req.apartmentNo}
                </div>
                <div>
                  <span className="font-semibold">Rent:</span>{" "}
                  {req.rent.toLocaleString()}$
                </div>
                <div>
                  <span className="font-semibold">Requested:</span>{" "}
                  {formatDate(req.reqDate)}
                </div>
              </div>

              <div className="mt-4 flex space-x-3">
                <Button
                  className="cursor-pointer"
                  size="sm"
                  color="blue"
                  onClick={() => handleAction(req._id, req.email, "accept")}>
                  Accept
                </Button>
                <Button
                  className="cursor-pointer"
                  size="sm"
                  color="red"
                  onClick={() => handleAction(req._id, req.email, "reject")}>
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgreementReq;
