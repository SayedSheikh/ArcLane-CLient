import React from "react";
import Hero from "../Hero/Hero";
import AboutBuilding from "../AboutBuilding/AboutBuilding";
import Amenities from "../Amenities/Amenities";
// import useAuth from "../../../Hooks/useAuth";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <AboutBuilding />
      <Amenities />
    </div>
  );
};

export default Home;
