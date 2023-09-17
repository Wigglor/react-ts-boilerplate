import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51NT1gBBs7XdR6397zh1APukpUUnisIK4PQrRkdOsPhSiwezXMmRgf59pWWCTQNC7rHV6xNRgP3ogueQrvmNCnLef00L3BD4aVr",
);

const PaymentStatusCheck = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret as string).then(({ paymentIntent }) => {
      // Inspect the PaymentIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Success! Payment received.");
          break;

        case "processing":
          setMessage("Payment processing. We'll update you when payment is received.");
          break;

        case "requires_payment_method":
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return <h1>{message}</h1>;
};

const PaymentStatus: React.FC = () => (
  <main>
    <Elements stripe={stripePromise}>
      <PaymentStatusCheck />
    </Elements>
  </main>
);
export default PaymentStatus;
