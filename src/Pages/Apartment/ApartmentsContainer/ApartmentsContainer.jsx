import React, { useState } from "react";
import { useLoaderData } from "react-router";
import ApartmentCard from "../ApartmentCard/ApartmentCard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";

const ApartmentsContainer = () => {
  const aptNumber = useLoaderData();
  const axios = useAxios();

  const numberOfPages = Math.ceil(aptNumber.data / 6);

  const [pagesNumber, setPagesNumber] = useState([
    ...Array(numberOfPages).keys(),
  ]);
  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [max, setMax] = useState(25000);
  const [min, setMin] = useState(15000);

  const rentOptions = [
    15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000,
  ];

  const fetchCount = async () => {
    const res = await axios.get(
      `/apartments/${
        page - 1
      }/6?search=${searchValue}&max=${max}&min=${min}&countPage=count`
    );

    const countPages = Math.ceil(res.data / 6);

    setPagesNumber([...Array(countPages).keys()]);

    return res.data;
  };

  const {
    data,
    isLoading,
    isError,
    refetch: refetchData,
  } = useQuery({
    queryKey: ["apartments", page],
    enabled: true,
    queryFn: async () => {
      const res = await axios.get(
        `/apartments/${page - 1}/6?search=${searchValue}&max=${max}&min=${min}`
      );

      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchCount();
    refetchData();
  };

  return (
    <div className="dark:bg-[#030712] max-w-[1500px] mx-auto py-16 w-11/12 font-inter text-gray-900 dark:text-gray-200">
      {/* Heading */}
      <header className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Apartments
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
          Find your perfect home with our wide selection of apartments.
        </p>
      </header>

      {/* Main content - split left and right on md+ */}
      <div className="lg:flex lg:space-x-10 mx-auto">
        {/* Left - Search & filters */}
        <aside className="lg:w-[20%] mb-10 lg:mb-0 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Search Apartments</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Search apartments by <br />
              <span className="font-medium text-gray-800 dark:text-gray-200">
                floor
              </span>{" "}
              <code className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1 py-[1px] rounded text-xs font-mono">
                3
              </code>
              ,{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                block name
              </span>{" "}
              <code className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1 py-[1px] rounded text-xs font-mono">
                C
              </code>
              , or{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                apartment no.
              </span>{" "}
              <code className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1 py-[1px] rounded text-xs font-mono">
                C3-08
              </code>
              .
            </p>
          </div>

          <form className="flex flex-col gap-4">
            <input
              name="search"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by floor/block/apartment no."
              className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
            />

            <select
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium">
              {rentOptions.map((val) => (
                <option key={val} value={val}>
                  Min: ${val}
                </option>
              ))}
            </select>

            <select
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium">
              {rentOptions.map((val) => (
                <option className="w-full" key={val} value={val}>
                  Max: ${val}
                </option>
              ))}
            </select>

            <button
              onClick={handleSubmit}
              className="w-full px-10 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition cursor-pointer">
              Search
            </button>
          </form>
        </aside>

        {/* Right - Apartment cards */}
        <section className="lg:w-[80%] grid grid-cols-1 xl:grid-cols-2 gap-5">
          <ApartmentCard />
          <ApartmentCard />
          <ApartmentCard />
          <ApartmentCard />
          <ApartmentCard />
        </section>
      </div>

      {/* Pagination buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-16">
        {pagesNumber?.map((i) => (
          <button
            key={i}
            className={`px-5 py-2 rounded-md border border-gray-300 dark:border-gray-600   hover:bg-indigo-600 hover:text-white text-gray-900 dark:text-gray-100 transition cursor-pointer ${
              page - 1 === i
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800"
            }`}
            onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApartmentsContainer;
