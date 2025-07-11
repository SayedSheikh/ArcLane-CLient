import React from "react";

const ApartmentCard = ({ apartment }) => {
  const {
    apartmentImage,
    floorNo,
    blockName,
    apartmentNo,
    rent,
    apartmentStatus,
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

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden font-inter border border-primary/30 hover:outline-1 outline-primary">
      <div className="flex flex-col md:flex-row w-full h-full group">
        {/* Image Section with status badge */}
        <div className="md:w-2/5 w-full relative overflow-hidden">
          <img
            src={apartmentImage}
            alt={`Apartment ${apartmentNo}`}
            className="group-hover:scale-130 h-full w-full object-cover md:rounded-l-lg md:rounded-t-none rounded-t-lg transition-all"
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

          <button className="mt-3 w-fit px-4 py-2 text-sm font-semibold bg-primary text-white rounded-md hover:bg-primary/70 transition cursor-pointer">
            Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
