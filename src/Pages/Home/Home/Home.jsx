import React, { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import AboutBuilding from "../AboutBuilding/AboutBuilding";
import Amenities from "../Amenities/Amenities";
import SpecialOffers from "../SpecialOffers/SpecialOffers";
import Location from "../Location/Location";
import WhatsAround from "../WhatsAround/WhatsAround";
import DuePaymentPopup from "../DuePaymentPopup/DuePaymentPopup";
import useDueCalculate from "../DuePaymentPopup/useDueCalculate";
// import useAuth from "../../../Hooks/useAuth";

const Home = () => {
  const { isMember, hasDue, unpaidLoading } = useDueCalculate();

  const [showDuePopup, setShowDuePopup] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("dueNotificationShown");

    if (hasDue && isMember && !alreadyShown && !unpaidLoading) {
      setShowDuePopup(true);
      sessionStorage.setItem("dueNotificationShown", "true");
    }
  }, [hasDue, isMember, unpaidLoading]);
  return (
    <div className="">
      {showDuePopup && (
        <DuePaymentPopup onClose={() => setShowDuePopup(false)} />
      )}
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
