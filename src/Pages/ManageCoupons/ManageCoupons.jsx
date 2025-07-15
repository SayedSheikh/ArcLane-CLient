import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading1 from "../Loadings/Loading1";
import Swal from "sweetalert2";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    couponCode: "",
    discountPercentage: "",
    description: "",
    status: "active",
  });

  const {
    data: coupons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const { mutateAsync: postCoupon, isPending } = useMutation({
    mutationFn: async (couponData) => {
      const { data } = await axiosSecure.post(
        `/coupon/${user?.email}`,
        couponData
      );
      return data;
    },
    onSuccess: (res) => {
      if (res.insertedId) {
        queryClient.invalidateQueries(["coupons"]);
        setShowModal(false);
        setFormData({
          couponCode: "",
          discountPercentage: "",
          description: "",
          status: "active",
        });
        Swal.fire("Success", "Coupon added successfully!", "success");
      } else {
        Swal.fire("Error", res.message || "Failed to add coupon", "error");
      }
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong.", "error");
    },
  });

  const { mutateAsync: toggleStatus } = useMutation({
    mutationFn: async (coupon) => {
      const newStatus = coupon.status === "active" ? "expired" : "active";
      const { data } = await axiosSecure.patch(
        `/coupon/status/${user?.email}/${coupon._id}`,
        {
          status: newStatus,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["coupons"]);
      Swal.fire("Updated!", "Coupon status changed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update coupon status.", "error");
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { couponCode, discountPercentage } = formData;
    if (!couponCode || !discountPercentage) {
      Swal.fire("Warning", "All fields are required.", "warning");
      return;
    }

    const percentage = parseFloat(discountPercentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      Swal.fire("Invalid", "Discount must be between 0 and 100.", "warning");
      return;
    }

    await postCoupon(formData);
  };

  const handleStatusChange = (coupon) => {
    const nextStatus = coupon.status === "active" ? "expired" : "active";
    Swal.fire({
      title: "Are you sure?",
      text: `Change status to "${nextStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, change it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleStatus(coupon);
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-200";
      case "expired":
        return "bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-200";
      case "upcoming":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-200";
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700/40 dark:text-gray-200";
    }
  };

  return (
    <div className="p-6 text-gray-800 dark:text-white font-inter">
      <div className="flex flex-col  justify-start items-start mb-6 gap-3">
        <h2 className="text-3xl font-bold">🎟️ Manage Coupons</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-md flex items-center gap-2 shadow hover:bg-indigo-700 transition cursor-pointer">
          <FaPlus />
          Add Coupon
        </button>
      </div>

      {isLoading && <Loading1 />}
      {isError && <p className="text-red-500">Failed to load coupons.</p>}

      {!isLoading && coupons.length > 0 && (
        <div className=" max-w-3xl overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-md mx-auto mt-20">
          <table className="w-full table-auto text-sm">
            <thead className="bg-indigo-50 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Code</th>
                <th className="px-6 py-4 text-left font-semibold">Discount</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {coupons.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-3 font-mono">{c.couponCode}</td>
                  <td className="px-6 py-3">{c.discountPercentage}%</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        c.status
                      )}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleStatusChange(c)}
                      className="text-indigo-600 hover:underline dark:text-indigo-400 cursor-pointer">
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-5">Add New Coupon</h3>

            <input
              type="text"
              name="couponCode"
              placeholder="Coupon Code"
              value={formData.couponCode}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            />
            <input
              type="number"
              name="discountPercentage"
              placeholder="Discount Percentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              className="w-full mb-4 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            />
            <textarea
              name="description"
              placeholder="Coupon description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full mb-4 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 resize-none"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mb-5 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600">
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 cursor-pointer">
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
