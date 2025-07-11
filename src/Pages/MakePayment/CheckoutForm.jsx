import React, { useMemo, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const getCardOptions = (isDark) => ({
  iconStyle: "solid",
  style: {
    base: {
      iconColor: isDark ? "#818CF8" : "#6366f1", // Tailwind: indigo-400/500
      color: isDark ? "#F3F4F6" : "#111827", // Tailwind: gray-100 / gray-900
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      backgroundColor: "transparent",
      "::placeholder": {
        color: isDark ? "#9CA3AF" : "#6B7280", // gray-400 / gray-500
      },
    },
    invalid: {
      iconColor: "#ef4444", // red-500
      color: "#ef4444",
    },
  },
});

// const CARD_OPTIONS = {
//   iconStyle: "solid",
//   style: {
//     base: {
//       iconColor: "#6366f1",
//       color: "#111827",
//       fontWeight: 500,
//       fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//       fontSize: "16px",
//       fontSmoothing: "antialiased",
//       backgroundColor: "transparent",
//       "::placeholder": {
//         color: "#9CA3AF",
//       },
//     },
//     invalid: {
//       iconColor: "#ef4444",
//       color: "#ef4444",
//     },
//   },
// };

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
  <div className="mb-4">
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
    className={`w-full mt-2 px-4 py-2 text-white font-semibold rounded-md transition
      ${
        error
          ? "bg-red-500 hover:bg-red-600"
          : "bg-indigo-600 hover:bg-indigo-700"
      }
      ${processing ? "opacity-50 cursor-not-allowed" : ""}`}>
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

const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: user?.email,
    name: user?.displayName,
  });

  const axiosSecure = useAxiosSecure();

  const isDark = document.documentElement.classList.contains("dark");

  const CARD_OPTIONS = useMemo(() => {
    return getCardOptions(isDark);
  }, [isDark]);

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
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    if (payload.error) {
      setError(payload.error);
      return;
    } else {
      axiosSecure
        .post("/create-payment-intent", {
          amount: 2500,
        })
        .then(async (res) => {
          const { paymentIntent, error } = await stripe.confirmCardPayment(
            res.data.clientSecret,
            {
              payment_method: {
                card,
                billing_details: {
                  name: user?.displayName || "Anonymous",
                  email: user?.email || "unknown@email.com",
                },
              },
            }
          );

          if (error) {
            setError(error);
            setProcessing(false);
          } else {
            setError(null);
            setProcessing(false);
            setPaymentMethod({
              ...paymentIntent,
              cardType: payload.paymentMethod.card,
            });
          }
        });
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
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all">
      {paymentMethod ? (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
            Payment Successful
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Payment ID: {paymentMethod.id}
          </p>
          <button
            onClick={reset}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
            Make another payment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
            Pay $25
          </SubmitButton>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
