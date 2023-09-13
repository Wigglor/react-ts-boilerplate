import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { axiosPrivate } from "../../api/axios";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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

const StripeCheckoutForm = (): ReactElement => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
      billing_details: {
        name,
        email,
      },
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  // const clientSecret ="testsecret"
  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Card details:</label>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );

  // return (
  //   <main className={styles.Billing}>
  //     <h1>Billing</h1>

  //     <Elements  stripe={stripe}>
  //     <form onSubmit={handleSubmit}>

  //       <button disabled={!stripe}>Submit</button>
  //     </form>
  //       </Elements>
  //   </main>
  // );
};

const Account: React.FC = () => (
  <Elements stripe={stripePromise}>
    <StripeCheckoutForm />
  </Elements>
);
export default Account;
