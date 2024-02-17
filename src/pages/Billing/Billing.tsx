import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeElements, StripeError, loadStripe } from "@stripe/stripe-js";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
  lookup_key: string;
}

interface Price {
  prices: Prices_;
}

interface Options {
  mode: string;
  amount: number;
  currency: string;
  appearance: {
    theme: "flat" | "stripe" | "night" | undefined;
  };
}

interface Billing {
  type: string;
  clientSecret: string;
}

interface TEST {
  mode: string;
  amount: number;
  currency: string;
  appearance: {
    theme: string;
  };
}

type StripeOptions = {
  mode: string;
  appearance: {
    theme: string;
  };
};

type OptionsParams = {
  onOptionsChange: (options: Options) => void;
};

type Test = {
  setTest: (setTest: TEST) => void;
};

const CheckoutForm = ({
  setTest,
}: Test): // { onOptionsChange }: OptionsParams
ReactElement => {
  const { setAuth, auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements: StripeElements | null = useElements();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [paidPlan, setPaidPlan] = useState(false);
  const [upgradePlan, setUpgradePlan] = useState<PricesAttribute | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<PricesAttribute | null>(null);

  const handlePlanClick = (price: PricesAttribute) => {
    if (paidPlan !== true) {
      setSelectedPrice(price);
    }
    setUpgradePlan(price);

    setTest({
      mode: "subscription",
      amount: price.unit_amount,
      currency: price.currency,
      appearance: {
        theme: "flat" as const,
      },
    });
  };

  const closeModal = () => {
    setSelectedPrice(null);
  };
  const closeUpgradeModal = () => {
    setUpgradePlan(null);
  };

  const [prices, setPrices] = useState<Price>();

  useEffect(() => {
    const controller = new AbortController();

    const getPrices = async () => {
      try {
        const response: ApiResponse<Price> = await axiosPrivate.get("/prices", {
          signal: controller.signal,
          withCredentials: true,
        });

        setPrices(response.data);
      } catch (err) {
        throw Error();
      }
    };
    if (auth.plan !== undefined) {
      setPaidPlan(true);
    }
    getPrices();
    return () => {
      controller.abort();
    };
  }, []);

  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event: React.FormEvent, priceId: string) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await elements.submit();

    if (result.error) {
      return;
    }

    const billingResponse: ApiResponse<Billing> = await axiosPrivate.post(
      "/billingtest",
      JSON.stringify({
        price: priceId,
      }),
      {
        withCredentials: true,
      },
    );

    const { type, clientSecret } = await billingResponse.data;
    const confirmIntent = type === "setup" ? stripe.confirmSetup : stripe.confirmPayment;

    // Confirm the Intent using the details collected by the Payment Element
    const { error } = await confirmIntent({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/paymentstatus`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when confirming the Intent.
      // Show the error to your customer (for example, "payment details incomplete").

      console.error(JSON.stringify(error));
      handleError(error);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    // <main className={styles["onboarding"]}>
    //   <div className={styles["pricing-widget"]}>
    //     {paidPlan
    //       ? // <>
    //         //   <h1>hej</h1>
    //         //   <p>{JSON.stringify(prices)}</p>
    //         // </>
    //         prices &&
    //         prices.prices?.data.map((price) =>
    //           price.lookup_key === auth.plan ? (
    //             <div key={price.id} className={styles["plan"]}>
    //               <h2>{price.lookup_key}</h2>
    //               <p>
    //                 <b>Current Plan</b>
    //               </p>

    //               {/* <button onClick={() => handlePlanClick(price)}> Start {price.lookup_key} </button> */}
    //             </div>
    //           ) : (
    //             <div key={price.id} className={styles["plan"]}>
    //               <h2>{price.lookup_key}</h2>
    //               <p>
    //                 Price: {price.unit_amount_decimal} {price.currency}
    //               </p>

    //               <button onClick={() => handlePlanClick(price)}>
    //                 {" "}
    //                 Upgrade to {price.lookup_key}{" "}
    //               </button>
    //             </div>
    //           ),
    //         )
    //       : prices &&
    //         prices.prices?.data.map((price) => (
    //           <div key={price.id} className={styles["plan"]}>
    //             <h2>{price.lookup_key}</h2>
    //             <p>
    //               Price: {price.unit_amount_decimal} {price.currency}
    //             </p>

    //             <button onClick={() => handlePlanClick(price)}> Start {price.lookup_key} </button>
    //           </div>
    //         ))}

    //     {upgradePlan && (
    //       <div className={styles["modal-overlay"]} onClick={closeUpgradeModal}>
    //         <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
    //           <h2>Tier {upgradePlan.unit_amount_decimal}</h2>
    //           <p>
    //             You have selected the {upgradePlan.lookup_key} Plan. Proceed with your choice or
    //             click outside this box to cancel.
    //           </p>
    //         </div>
    //       </div>
    //     )}
    //     {selectedPrice && (
    //       <div className={styles["modal-overlay"]} onClick={closeModal}>
    //         <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
    //           <h2>Tier {selectedPrice.unit_amount_decimal}</h2>
    //           <p>
    //             You have selected the {selectedPrice.lookup_key} Plan. Proceed with your choice or
    //             click outside this box to cancel.
    //           </p>
    //           {/* Insert form component here */}

    //           {/* <Elements stripe={stripePromise} options={options}> */}
    //           {/* <Elements
    //             stripe={stripePromise}
    //             options={{
    //               mode: "subscription",
    //               amount: selectedPrice.unit_amount,
    //               currency: selectedPrice.currency,
    //               appearance: {
    //                 theme: "flat" as const,
    //               },
    //             }}
    //           > */}
    //           <form onSubmit={(e) => handleSubmit(e, selectedPrice.id)}>
    //             <PaymentElement />
    //             <button type="submit" disabled={!stripe || !elements}>
    //               Submit
    //             </button>
    //           </form>
    //           <button onClick={closeModal}>Close</button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </main>
    <div className="h-full">
      <div className="bg-gray-100 flex justify-evenly text-white">
        {paidPlan
          ? prices &&
            prices.prices?.data.map((price) =>
              price.lookup_key === auth.plan ? (
                <div key={price.id}>
                  <h2>{price.lookup_key}</h2>
                  <p>
                    <b>Current Plan</b>
                  </p>

                  {/* <button onClick={() => handlePlanClick(price)}> Start {price.lookup_key} </button> */}
                </div>
              ) : (
                <div key={price.id}>
                  <h2>{price.lookup_key}</h2>
                  <p>
                    Price: {price.unit_amount_decimal} {price.currency}
                  </p>

                  <button onClick={() => handlePlanClick(price)}>
                    {" "}
                    Upgrade to {price.lookup_key}{" "}
                  </button>
                </div>
              ),
            )
          : prices &&
            prices.prices?.data.map((price) => (
              <div className="bg-gray-900" key={price.id}>
                <h2>{price.lookup_key}</h2>
                <p>
                  Price: {price.unit_amount_decimal} {price.currency}
                </p>

                <button onClick={() => handlePlanClick(price)}> Start {price.lookup_key} </button>
              </div>
            ))}

        {upgradePlan && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-300 z-40 flex justify-center items-center"
            onClick={closeUpgradeModal}
          >
            <div className="bg-gray-700" onClick={(e) => e.stopPropagation()}>
              <h2>Tier {upgradePlan.unit_amount_decimal}</h2>
              <p>
                You have selected the {upgradePlan.lookup_key} Plan to upgrade to. Proceed with your
                choice or click outside this box to cancel.
              </p>
            </div>
          </div>
        )}
        {selectedPrice && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-300 z-40 flex justify-center items-center"
            onClick={closeModal}
          >
            <div className="bg-gray-700 p-10" onClick={(e) => e.stopPropagation()}>
              <h2>Tier {selectedPrice.unit_amount_decimal}</h2>
              <p>
                You have selected the {selectedPrice.lookup_key} Plan. Proceed with your choice or
                click outside this box to cancel.
              </p>
              {/* Insert form component here */}

              {/* <Elements stripe={stripePromise} options={options}> */}
              {/* <Elements
                stripe={stripePromise}
                options={{
                  mode: "subscription",
                  amount: selectedPrice.unit_amount,
                  currency: selectedPrice.currency,
                  appearance: {
                    theme: "flat" as const,
                  },
                }}
              > */}
              <form onSubmit={(e) => handleSubmit(e, selectedPrice.id)}>
                <PaymentElement />
                <button type="submit" disabled={!stripe || !elements}>
                  Submit
                </button>
              </form>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
    // <main>
    //   <div>
    //     {paidPlan
    //       ? // <>
    //         //   <h1>hej</h1>
    //         //   <p>{JSON.stringify(prices)}</p>
    //         // </>
    //         prices &&
    //         prices.prices?.data.map((price) =>
    //           price.lookup_key === auth.plan ? (
    //             <div key={price.id} className={styles["plan"]}>
    //               <h2>{price.lookup_key}</h2>
    //               <p>
    //                 <b>Current Plan</b>
    //               </p>

    //               {/* <button onClick={() => handlePlanClick(price)}> Start {price.lookup_key} </button> */}
    //             </div>
    //           ) : (
    //             <div key={price.id} className={styles["plan"]}>
    //               <h2>{price.lookup_key}</h2>
    //               <p>
    //                 Price: {price.unit_amount_decimal} {price.currency}
    //               </p>

    //               <button onClick={() => handlePlanClick(price)}>
    //                 {" "}
    //                 Upgrade to {price.lookup_key}{" "}
    //               </button>
    //             </div>
    //           ),
    //         )
    //       : prices &&
    //         prices.prices?.data.map((price) => (
    //           <div key={price.id} className={styles["plan"]}>
    //             <h2>{price.lookup_key}</h2>
    //             <p>
    //               Price: {price.unit_amount_decimal} {price.currency}
    //             </p>

    //             <button onClick={() => handlePlanClick(price)}> Start {price.lookup_key} </button>
    //           </div>
    //         ))}

    //     {upgradePlan && (
    //       <div onClick={closeUpgradeModal}>
    //         <div onClick={(e) => e.stopPropagation()}>
    //           <h2>Tier {upgradePlan.unit_amount_decimal}</h2>
    //           <p>
    //             You have selected the {upgradePlan.lookup_key} Plan. Proceed with your choice or
    //             click outside this box to cancel.
    //           </p>
    //         </div>
    //       </div>
    //     )}
    //     {selectedPrice && (
    //       <div>
    //         <div onClick={(e) => e.stopPropagation()}>
    //           <h2>Tier {selectedPrice.unit_amount_decimal}</h2>
    //           <p>
    //             You have selected the {selectedPrice.lookup_key} Plan. Proceed with your choice or
    //             click outside this box to cancel.
    //           </p>
    //           {/* Insert form component here */}

    //           {/* <Elements stripe={stripePromise} options={options}> */}
    //           {/* <Elements
    //             stripe={stripePromise}
    //             options={{
    //               mode: "subscription",
    //               amount: selectedPrice.unit_amount,
    //               currency: selectedPrice.currency,
    //               appearance: {
    //                 theme: "flat" as const,
    //               },
    //             }}
    //           > */}
    //           <form onSubmit={(e) => handleSubmit(e, selectedPrice.id)}>
    //             <PaymentElement />
    //             <button type="submit" disabled={!stripe || !elements}>
    //               Submit
    //             </button>
    //           </form>
    //           <button onClick={closeModal}>Close</button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </main>

    //     {/* Payment succeeds - regular card: 4242424242424242 */}
    //     {/* Payment requires authentication - SCA card: 4000002500003155 */}
    //     {/* Payment is declined: 4000000000009995 */}
  );
};

const Billing = (): ReactElement => {
  const [options, setOptions] = useState<Options | undefined>(undefined);
  const [test, setTest] = useState<TEST | null>(null);

  const handleOptionsChange = (newOptions: Options) => {
    setOptions(newOptions);
  };

  return (
    // <main className={styles.Billing}>
    //   <div className={styles.stripe_element}>
    //     <Elements
    //       stripe={stripePromise}
    //       options={{
    //         mode: "subscription",
    //         amount: 0,
    //         currency: "eur",
    //         appearance: {
    //           theme: "flat",
    //         },
    //       }}
    //     >
    //       <CheckoutForm setTest={setTest} />
    //       {/* <CheckoutForm onOptionsChange={handleOptionsChange} /> */}
    //     </Elements>
    //   </div>
    // </main>
    <>
      <div className="h-full">
        <div className="h-full">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "subscription",
              amount: 0,
              currency: "eur",
              appearance: {
                theme: "flat",
              },
            }}
          >
            <CheckoutForm setTest={setTest} />
            {/* <CheckoutForm onOptionsChange={handleOptionsChange} /> */}
          </Elements>
        </div>
      </div>
    </>
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
