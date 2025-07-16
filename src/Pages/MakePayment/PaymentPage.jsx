import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { Navigate, useLocation } from "react-router";
const stripePromise = loadStripe(`${import.meta.env.VITE_PK}`);
const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};
const PaymentPage = () => {
  const location = useLocation();

  const formData = location?.state?.formData || "";
  // console.log(location?.state?.formData);

  if (!formData) {
    return <Navigate to="/dashboard/payment"></Navigate>;
  }

  return (
    <div className="AppWrapper">
      <title>ArcLane | Payment</title>
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm formData={formData} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
