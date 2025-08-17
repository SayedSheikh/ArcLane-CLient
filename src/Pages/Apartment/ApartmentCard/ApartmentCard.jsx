import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const ApartmentCard = ({ apartment, featured }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    apartmentImage,
    floorNo,
    blockName,
    apartmentNo,
    rent,
    apartmentStatus,
    _id,
  } = apartment;

  const getStatusStyle = () => {
    switch (apartmentStatus) {
      case "available":
        return " text-green-700 ";
      case "pending":
        return " text-yellow-700";
      case "booked":
        return " text-red-700";
      default:
        return " text-gray-700";
    }
  };

  const handleClick = async () => {
    if (!user) {
      navigate("/login", { state: { from: pathname } });
      toast.success("LogIn First !!");
      return;
    }

    if (apartmentStatus === "pending" || apartmentStatus === "booked") {
      toast.error(`apartment not available !!`);
      return;
    }

    // Confirmation with SweetAlert2
    const confirmResult = await Swal.fire({
      title: "Confirm Agreement Request",
      text: `Want an agreement for Apartment ${apartmentNo}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366f1", // indigo
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, request it",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      // User cancelled
      return;
    }

    const details = {
      apartmentId: _id,
      floorNo,
      blockName,
      apartmentNo,
      rent,
      agreementStatus: "pending",
      reqUser: user?.displayName,
      reqEmail: user?.email,
      reqDate: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post(`/agreement/${user?.email}`, details);

      if (res.data?.insertedId) {
        queryClient.invalidateQueries(["apartments"]);
        await Swal.fire({
          icon: "success",
          title: "Agreement request sent!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data?.message || "Something went wrong",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      toast.error("Failed to create agreement");
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden font-inter border border-primary/30 hover:outline-1 outline-primary">
      <div className="flex flex-col md:flex-row w-full h-full group">
        {/* Image Section with status badge */}
        <div className="md:w-2/5 w-full relative overflow-hidden">
          <img
            src={apartmentImage}
            alt={`Apartment ${apartmentNo}`}
            className="group-hover:scale-130 h-full w-full object-cover md:rounded-l-lg md:rounded-t-none rounded-t-lg transition-all duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-3/5 w-full p-5 flex flex-col justify-center gap-1">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Apartment {apartmentNo}
          </h5>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Floor:</span> {floorNo}
            </p>
            -
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Block:</span> {blockName}
            </p>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Rent:</span> ${rent}
          </p>

          <p className="text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Status:
            </span>{" "}
            <span className={`font-semibold ${getStatusStyle()}`}>
              {apartmentStatus}
            </span>
          </p>

          {featured ? (
            <button
              onClick={() => navigate("/apartment")}
              className="mt-3 w-fit px-4 py-2 text-sm font-semibold bg-primary text-white rounded-md hover:bg-primary/70 transition cursor-pointer">
              View More
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="mt-3 w-fit px-4 py-2 text-sm font-semibold bg-primary text-white rounded-md hover:bg-primary/70 transition cursor-pointer">
              Agreement
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
