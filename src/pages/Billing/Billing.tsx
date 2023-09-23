import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { axiosPrivate } from "../../api/axios";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Billing.module.scss";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

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

interface PricesAttribute {
  id: string;
  currency: string;
  product: string;
  unit_amount_decimal: string;
}

interface Price {
  prices: PricesAttribute[];
}

const Billing = (): ReactElement => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // const stripe = useStripe();
  // const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [prices, setPrices] = useState<PricesAttribute[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    // Define an async function
    const getPosts = async () => {
      try {
        const response: ApiResponse<PricesAttribute[]> = await axiosPrivate.get("/prices", {
          signal: controller.signal,
          withCredentials: true,
        });
        console.log(response);
        console.log(response.data);
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

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (!stripe || !elements) return;

  //   const cardElement = elements.getElement(CardElement);

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: cardElement!,
  //     billing_details: {
  //       name,
  //       email,
  //     },
  //   });

  //   if (error) {
  //     console.log("[error]", error);
  //   } else {
  //     console.log("[PaymentMethod]", paymentMethod);
  //   }
  // };

  return (
    <main className={styles.Billing}>
      {/* {prices &&
        prices.map((price) => (
          <div key={price.id} className={styles["plan"]}>
            <h2>{price.product}</h2>
            <p>{price.unit_amount_decimal}</p>

            <button> Start {price.product} Plan</button>
          </div>
        ))} */}
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
