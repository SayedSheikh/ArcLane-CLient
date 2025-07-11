import { Card } from "flowbite-react";
import React from "react";

const ApartmentCard = () => {
  return (
    <Card className="w-full no-inner-padding">
      <div className="flex flex-col md:flex-row w-full">
        {/* Image section (40%) */}
        <div className="md:w-2/5 w-full">
          <img
            src="https://i.postimg.cc/YSq39jRZ/img-9.jpg"
            alt="Apartment"
            className="h-full w-full object-cover md:rounded-l-lg md:rounded-t-[0px] rounded-t-lg  p-0"
          />
        </div>

        {/* Text section (60%) */}
        <div className="p-4 md:w-3/5 w-full flex flex-col justify-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ApartmentCard;
