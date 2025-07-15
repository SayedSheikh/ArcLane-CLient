import React, { useMemo, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const getCardOptions = (isDark) => ({
  iconStyle: "solid",
  style: {
    base: {
      iconColor: isDark ? "#818CF8" : "#6366f1",
      color: isDark ? "#F3F4F6" : "#111827",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      backgroundColor: "transparent",
      "::placeholder": {
        color: isDark ? "#9CA3AF" : "#6B7280",
      },
    },
    invalid: {
      iconColor: "#ef4444",
      color: "#ef4444",
    },
  },
});

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="mb-4 w-full">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      readOnly
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
    />
  </div>
);

const CardField = ({ onChange, CARD_OPTIONS }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Card Details
    </label>
    <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    type="submit"
    disabled={processing || disabled}
    className={`w-full mt-2 px-4 py-2 text-white font-semibold rounded-md transition ${
      error
        ? "bg-red-500 hover:bg-red-600"
        : "bg-indigo-600 hover:bg-indigo-700"
    } ${processing ? "opacity-50 cursor-not-allowed" : ""}`}>
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
    <svg
      width="16"
      height="16"
      viewBox="0 0 17 17"
      className="fill-red-500 dark:fill-red-400">
      <path d="M8.5,17 C3.8,17 0,13.2 0,8.5 C0,3.8 3.8,0 8.5,0 C13.2,0 17,3.8 17,8.5 C17,13.2 13.2,17 8.5,17 Z" />
      <path
        d="M8.5,7.3 L6.1,4.9 C5.8,4.6 5.2,4.6 4.9,4.9 C4.6,5.2 4.6,5.8 4.9,6.1 L7.3,8.5 L4.9,10.9 C4.6,11.2 4.6,11.7 4.9,12.1 C5.2,12.4 5.8,12.4 6.1,12.1 L8.5,9.7 L10.9,12.1 C11.2,12.4 11.7,12.4 12.1,12.1 C12.4,11.7 12.4,11.2 12.1,10.9 L9.7,8.5 L12.1,6.1 C12.4,5.8 12.4,5.2 12.1,4.9 C11.7,4.6 11.2,4.6 10.9,4.9 L8.5,7.3 Z"
        fill="#fff"
      />
    </svg>
    {children}
  </div>
);

const CheckoutForm = ({ formData }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [couponLoading, setCouponLoading] = useState(false);
  const [amount, setAmount] = useState(parseFloat(formData?.rent).toFixed(2));
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: user?.email,
    name: user?.displayName,
  });

  const isDark = document.documentElement.classList.contains("dark");
  const CARD_OPTIONS = useMemo(() => getCardOptions(isDark), [isDark]);

  // Coupon verification
  const [couponCode, setCouponCode] = useState("");
  const [couponVerified, setCouponVerified] = useState(null); // true, false, or null

  const handleCouponVerify = async () => {
    if (!couponCode) return;
    try {
      setCouponLoading(true);
      const res = await axiosSecure.get(`/couponVerify/${couponCode}`);

      if (res.data?.isVerified === true) {
        const discount = parseInt(res.data?.discountPercentage);

        const reducedAmount = parseFloat(
          (amount * (discount / 100)).toFixed(2)
        );
        setAmount((amount - reducedAmount).toFixed(2));
      }
      setCouponVerified(res?.data?.isVerified || false);
      setCouponLoading(false);
    } catch {
      setCouponVerified(false);
      setCouponLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    if (cardComplete) setProcessing(true);
    if (error) {
      card.focus();
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: billingDetails,
    });

    if (payload.error) {
      setError(payload.error);
      return;
    }

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amount * 100,
      });

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        res.data.clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: billingDetails.name,
              email: billingDetails.email,
            },
          },
        }
      );

      if (error) {
        setError(error);
        setProcessing(false);
      } else {
        formData.rent = amount;
        formData.trasactionId = paymentIntent.id;
        formData.paymentData = new Date(paymentIntent?.created).toISOString();
        formData.cardType = payload?.paymentMethod?.card?.brand;
        (formData.couponUsed = couponVerified ? couponCode : null),
          await axiosSecure.post(`/paymentInfo/${user?.email}`, formData);
        queryClient.invalidateQueries(["unpaidMonths"]);
        setError(null);
        setProcessing(false);
        setPaymentMethod({
          ...paymentIntent,
          cardType: payload.paymentMethod.card,
        });
      }
    } catch (err) {
      setError({ message: "Payment failed. Please try again.", err });
      setProcessing(false);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: user?.email,
      name: user?.displayName,
    });
    navigate("/dashboard/userProfile");
  };
  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border transition-all border-primary/30">
      {!paymentMethod && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <img src="/stripe.png" className="w-24 h-auto" alt="stripe" />
          <div className="flex gap-2 mt-2 sm:mt-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              className="h-5 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              className="h-5 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
              alt="Amex"
              className="h-5 object-contain"
            />
          </div>
        </div>
      )}

      {paymentMethod ? (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-green-500 dark:text-green-400">
            Payment Successful
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Payment ID: {paymentMethod.id}
          </p>
          <button
            onClick={reset}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            Return to your profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 w-full">
            <Field
              label="Name"
              id="name"
              type="text"
              placeholder="Jane Doe"
              required
              autoComplete="name"
              value={user?.displayName || ""}
              onChange={() => {}}
            />
            <Field
              label="Email"
              id="email"
              type="email"
              placeholder="janedoe@gmail.com"
              required
              autoComplete="email"
              value={user?.email || ""}
              onChange={() => {}}
            />
          </div>

          {/* Coupon Code Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Coupon Code
            </label>
            <div className="flex gap-2 flex-col md:flex-row">
              <input
                type="text"
                placeholder="Enter your coupon"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponVerified(null);
                  setAmount(parseFloat(formData.rent).toFixed(2));
                }}
                className={`flex-1 px-4 py-2 rounded-md border transition outline-none
                  ${
                    couponVerified === true
                      ? "border-green-500 text-green-700 bg-green-50"
                      : couponVerified === false
                      ? "border-red-500 text-red-700 bg-red-50"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
              />
              <button
                disabled={couponLoading || !couponCode.trim()}
                type="button"
                onClick={handleCouponVerify}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm cursor-pointer">
                Verify
              </button>
              {couponVerified === true && (
                <span className="text-green-500 font-medium text-sm flex items-center gap-1">
                  ✅ Verified
                </span>
              )}
              {couponVerified === false && (
                <span className="text-red-500 font-medium text-sm flex items-center gap-1">
                  ❌ Invalid
                </span>
              )}
            </div>
          </div>

          <CardField
            CARD_OPTIONS={CARD_OPTIONS}
            onChange={(e) => {
              setError(e.error);
              setCardComplete(e.complete);
            }}
          />
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <SubmitButton
            processing={processing}
            error={error}
            disabled={!stripe || !cardComplete}>
            Pay {amount.toLocaleString() + "$"}
          </SubmitButton>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
