"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import ApartmentCard from "./ApartmentCard";
import ClipLoader from "react-spinners/ClipLoader"; // spinner for loading state
import ApartmentCard from "../../Apartment/ApartmentCard/ApartmentCard";
import useAxios from "../../../Hooks/useAxios";

const Featured = () => {
  const axios = useAxios();
  // const [searchValue, setSearchValue] = useState("");

  const min = 15000;
  const max = 25000;
  const search = "";
  const {
    data: apartments = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["apartments", "featured"],
    queryFn: async () => {
      const res = await axios.get(
        `/apartments/1/4?search=${search}&max=${max}&min=${min}`
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <ClipLoader size={50} color="#4f46e5" />
      </div>
    );
  }

  // console.log(apartments);

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg font-semibold">
          Oops! Something went wrong: {error?.message}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/70 transition">
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Featured Apartments
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Explore some of our best apartments available for you.
        </p>
      </div>

      {/* Apartments Grid */}
      {apartments?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {apartments.map((apartment) => (
            <ApartmentCard
              featured={true}
              key={apartment._id}
              apartment={apartment}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No apartments available right now.
        </p>
      )}
    </section>
  );
};

export default Featured;
