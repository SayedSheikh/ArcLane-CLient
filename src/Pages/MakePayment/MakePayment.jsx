import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router";

const MakePayment = () => {
  return (
    <div>
      <Link to="/dashboard/paymentPage">
        <Button>Toggle modal</Button>
      </Link>
    </div>
  );
};

export default MakePayment;
