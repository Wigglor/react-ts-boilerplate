import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { axiosPrivate } from "../../api/axios";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeElements, StripeError, loadStripe } from "@stripe/stripe-js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Billing.module.scss";

interface UserAttribute {
  Name: string;
  Value: string;
}

interface User {
  result: {
    Username: string;
    UserAttributes: UserAttribute[];
  };
}

const stripePromise = loadStripe(
  "pk_test_51NT1gBBs7XdR6397zh1APukpUUnisIK4PQrRkdOsPhSiwezXMmRgf59pWWCTQNC7rHV6xNRgP3ogueQrvmNCnLef00L3BD4aVr",
);

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
// response --> data --> prices{} --> data[]

interface Prices_ {
  data: PricesAttribute[];
}

interface PricesAttribute {
  id: string;
  currency: string;
  product: string;
  unit_amount_decimal: string;
  unit_amount: number;
}

interface Price {
  prices: Prices_;
}

interface Options {
  mode: string;
  appearance: {
    // theme: string;
    theme: "flat" | "stripe" | "night" | undefined;
  };
}

type StripeOptions = {
  mode: string;
  appearance: {
    theme: string;
  };
};

const Billing = (): ReactElement => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements: StripeElements | null = useElements();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<PricesAttribute | null>(null);

  const handlePlanClick = (price: PricesAttribute) => {
    setSelectedPrice(price);
  };

  const closeModal = () => {
    setSelectedPrice(null);
  };

  const [prices, setPrices] = useState<Price>();

  useEffect(() => {
    const controller = new AbortController();
    // Define an async function
    const getPosts = async () => {
      try {
        const response: ApiResponse<Price> = await axiosPrivate.get("/prices", {
          signal: controller.signal,
          withCredentials: true,
        });
        console.log(response);
        console.log(response.data.prices);
        console.log(prices);

        setPrices(response.data);
      } catch (err) {
        console.error(err);
        throw Error();
      }
    };

    getPosts();
    return () => {
      controller.abort();
    };
  }, []);

  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection

    // const { error: submitError } = await elements.submit();
    // if (submitError) {
    //   handleError(submitError);
    //   return;
    // }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // call billing
    const res = await fetch("/billing", {
      method: "POST",
    });
    const { type, clientSecret } = await res.json();
    const confirmIntent = type === "setup" ? stripe.confirmSetup : stripe.confirmPayment;

    // Confirm the Intent using the details collected by the Payment Element
    const { error } = await confirmIntent({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when confirming the Intent.
      // Show the error to your customer (for example, "payment details incomplete").
      handleError(error);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <main className={styles["onboarding"]}>
      <div className={styles["pricing-widget"]}>
        {prices &&
          prices.prices?.data.map((price) => (
            <div key={price.id} className={styles["plan"]}>
              <h2>Tier {price.unit_amount_decimal}</h2>
              <p>
                Price: {price.unit_amount_decimal} {price.currency}
              </p>

              <button onClick={() => handlePlanClick(price)}> Start {price.product} Plan</button>
            </div>
          ))}

        {selectedPrice && (
          <div className={styles["modal-overlay"]} onClick={closeModal}>
            <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
              <h2>{selectedPrice.product} Plan</h2>
              <p>
                You have selected the {selectedPrice.product} Plan. Proceed with your choice or
                click outside this box to cancel.
              </p>
              {/* Insert form component here */}

              {/* <Elements stripe={stripePromise} options={options}> */}
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "subscription",
                  amount: selectedPrice.unit_amount,
                  currency: selectedPrice.currency,
                  appearance: {
                    theme: "flat" as const,
                  },
                }}
              >
                <form onSubmit={handleSubmit}>
                  <PaymentElement />
                  <button type="submit" disabled={!stripe || !elements}>
                    Submit
                  </button>
                  {/* {!stripe || !elements ? (
                    <p>Loading payment system...</p>
                  ) : (
                    <button type="submit">Submit Payment</button>
                  )} */}
                </form>
              </Elements>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </main>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Name:</label>
    //     <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
    //   </div>
    //   <div>
    //     <label>Email:</label>
    //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //   </div>
    //   <div>
    //     <label>Card details:</label>
    //     {/* Payment succeeds - regular card: 4242424242424242 */}
    //     {/* Payment requires authentication - SCA card: 4000002500003155 */}
    //     {/* Payment is declined: 4000 0000 0000 9995 */}
    //     <CardElement />
    //   </div>
    //   <button type="submit" disabled={!stripe}>
    //     Pay
    //   </button>
    // </form>
  );
};

export default Billing;
/*
const Account: React.FC = () => {
  const options = {
    // passing the client secret obtained in step 3
    clientSecret: "pi_3NqytnBs7XdR639727iAKt2t_secret_HAjaNHEvkbV9Dk0Ua3oS1cYhl ",

    // Fully customizable with appearance API.

    appearance: {
      // "stripe" | "night" | "flat"
      theme: "flat" as const,
      // variables: {
      //   colorPrimary: "#0570de",
      //   colorBackground: "#ffffff",
      //   colorText: "#30313d",
      //   colorDanger: "#df1b41",
      //   fontFamily: "Ideal Sans, system-ui, sans-serif",
      //   spacingUnit: "2px",
      //   borderRadius: "4px",
      //   // See all possible variables below
      // },
    },
  };
  return (
    <main className={styles.Billing}>
      <Elements stripe={stripePromise} options={options}>
        <StripeCheckoutForm />
      </Elements>
    </main>
  );
};
export default Account;*/
