import { ReactElement, useState } from "react";
// import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
// import axiosPrivate from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY as string);
const stripePromise = loadStripe(
  "pk_test_51NT1gBBs7XdR6397zh1APukpUUnisIK4PQrRkdOsPhSiwezXMmRgf59pWWCTQNC7rHV6xNRgP3ogueQrvmNCnLef00L3BD4aVr",
);

const BillingForm = (setOptions: any): ReactElement => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPrivate = useAxiosPrivate();
  //   const [options, setOptions] = useState<StripeElementsOptions | undefined>(undefined);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    try {
      const response = await axiosPrivate.post(
        "/billing",
        JSON.stringify({ price: "price_1NlvxsBs7XdR63976skckphI" }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      const clientSecret = response.data.paymentIntent.client_secret;

      const options: StripeElementsOptions = {
        // passing the client secret obtained in step 3
        // clientSecret: "pi_3NqytnBs7XdR639727iAKt2t_secret_HAjaNHEvkbV9Dk0Ua3oS1cYhl ",
        clientSecret: clientSecret,
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
      // options.clientSecret = clientSecret;

      setOptions(options);
    } catch (err: any) {
      const errorMessage = err?.response.data.message;
      setErrorMessage(errorMessage);
    }

    /*if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/paymentstatus`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      console.log(JSON.stringify(error));

      setErrorMessage(error.message as string);
    } else {
      return redirect("/paymentstatus");
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }*/
  };
  return (
    // <main className={styles.Billing}>
    // <div className={styles.stripe_element}>
    //   {/* <Elements stripe={stripePromise} options={options}> */}
    //   <form onSubmit={handleSubmit}>
    //     <PaymentElement />
    //     {/* Payment succeeds - regular card: 4242424242424242 */}
    //     {/* Payment requires authentication - SCA card: 4000002500003155 */}
    //     {/* Payment is declined: 4000000000009995 */}
    //     <button disabled={!stripe}>Submit</button>
    //     {/* Show error message to your customers */}
    //     {errorMessage && <div>{errorMessage}</div>}
    //   </form>
    //   {/* </Elements> */}
    // </div>
    <div>
      {/* <Elements stripe={stripePromise} options={options}> */}
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        {/* Payment succeeds - regular card: 4242424242424242 */}
        {/* Payment requires authentication - SCA card: 4000002500003155 */}
        {/* Payment is declined: 4000000000009995 */}
        <button disabled={!stripe}>Submit</button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
      {/* </Elements> */}
    </div>
    // </main>
  );
};

const Billing: React.FC = () => {
  const [options, setOptions] = useState<StripeElementsOptions | undefined>(undefined);
  return (
    // <main className={styles.Billing}>
    //   <Elements stripe={stripePromise}>
    //     <BillingForm setOptions={setOptions} />
    //   </Elements>
    // </main>
    <main>
      <Elements stripe={stripePromise}>
        <BillingForm setOptions={setOptions} />
      </Elements>
    </main>
  );
};

export default Billing;
