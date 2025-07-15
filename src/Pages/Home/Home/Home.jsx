import React from "react";
import Hero from "../Hero/Hero";
import AboutBuilding from "../AboutBuilding/AboutBuilding";
import Amenities from "../Amenities/Amenities";
import SpecialOffers from "../SpecialOffers/SpecialOffers";
import Location from "../Location/Location";
import WhatsAround from "../WhatsAround/WhatsAround";
// import useAuth from "../../../Hooks/useAuth";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <AboutBuilding />
      <Amenities />
      <SpecialOffers />
      <Location />
      <WhatsAround />
    </div>
  );
};

export default Home;
