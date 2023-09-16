import { ReactElement } from "react";
// import { axiosPrivate } from "../../api/axios";
// import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./Billing.module.scss";

// const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY as string);
const stripePromise = loadStripe(
  "pk_test_51NT1gBBs7XdR6397zh1APukpUUnisIK4PQrRkdOsPhSiwezXMmRgf59pWWCTQNC7rHV6xNRgP3ogueQrvmNCnLef00L3BD4aVr",
);

const Billing = (): ReactElement => {
  const options = {
    // passing the client secret obtained in step 3
    clientSecret: "pi_3NqytnBs7XdR639727iAKt2t_secret_HAjaNHEvkbV9Dk0Ua3oS1cYhl ",
    // Fully customizable with appearance API.

    appearance: {
      // "stripe" | "night" | "flat"
      theme: "stripe" as const,
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
      <div className={styles.stripe_element}>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
    </main>
  );
};

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default Billing;
