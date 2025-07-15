import React from "react";
import { HiShoppingBag } from "react-icons/hi2";
import { MdSchool } from "react-icons/md";
import { BsHospital } from "react-icons/bs";
import { TbCoffee } from "react-icons/tb";
import { PiBusFill } from "react-icons/pi";
import { FaTrain } from "react-icons/fa";

const places = [
  {
    icon: <HiShoppingBag className="text-blue-500 text-2xl" />,
    title: "City Mall",
    category: "Shopping",
    distance: "0.5 km",
  },
  {
    icon: <MdSchool className="text-blue-500 text-2xl" />,
    title: "International School",
    category: "Education",
    distance: "1.2 km",
  },
  {
    icon: <BsHospital className="text-blue-500 text-2xl" />,
    title: "General Hospital",
    category: "Healthcare",
    distance: "0.8 km",
  },
  {
    icon: <TbCoffee className="text-blue-500 text-2xl" />,
    title: "Café District",
    category: "Dining",
    distance: "0.3 km",
  },
  {
    icon: <PiBusFill className="text-blue-500 text-2xl" />,
    title: "Bus Terminal",
    category: "Transport",
    distance: "0.4 km",
  },
  {
    icon: <FaTrain className="text-blue-500 text-2xl" />,
    title: "Metro Station",
    category: "Transport",
    distance: "0.7 km",
  },
];

const WhatsAround = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 pt-5 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">What's Around</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Explore the nearby landmarks, transport options, schools, and
          amenities just minutes away.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {places.map((place, index) => (
            <div
              key={index}
              className="flex items-center bg-white dark:bg-gray-800 rounded-xl border border-primary/20 px-5 py-3 text-left  hover:shadow-md transition duration-300 gap-1 hover:scale-105">
              <div className="p-3 rounded-sm bg-blue-50 dark:bg-gray-700 mr-4 scale-125">
                {place.icon}
              </div>
              <div className="">
                <h3 className=" font-semibold text-gray-900 dark:text-white text-lg">
                  {place.title}
                </h3>
                <p className="text-md text-gray-500 dark:text-gray-300">
                  {place.category}
                </p>
                <p className="text-md text-blue-500 font-medium">
                  {place.distance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsAround;
