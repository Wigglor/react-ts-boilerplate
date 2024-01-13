import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
// import styles from "./SignupPlan.module.scss";

const stripePromise = loadStripe("your_publishable_key_here");

type Plan = {
  name: string;
  features: string[];
};

const PLANS = [
  {
    name: "Free",
    features: ["1 User", "1GB Storage", "Community Support"],
  },
  {
    name: "Basic",
    features: ["5 Users", "50GB Storage", "Email Support"],
  },
  {
    name: "Enterprise",
    features: ["Unlimited Users", "1TB Storage", "24/7 Premium Support"],
  },
];

function StripeForm() {
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const accountResponse = await fetch("/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workspaceName }),
    });

    if (!accountResponse.ok) {
      console.error("Account creation failed");
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card as any);

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Send the token to your server for further processing
      // For instance, you can associate this token with the user in your database
      console.log(result.token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="workspace"
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Sign Up
      </button>
    </form>
  );
}

function SignupPlan() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  return (
    <main>
      <div>
        {PLANS.map((plan) => (
          <div key={plan.name}>
            <h2>{plan.name}</h2>

            <button onClick={() => handlePlanClick(plan)}> Start {plan.name} Plan</button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}

        {selectedPlan && (
          <div onClick={closeModal}>
            <div onClick={(e) => e.stopPropagation()}>
              <h2>{selectedPlan.name} Plan</h2>
              <p>
                You have selected the {selectedPlan.name} Plan. Proceed with your choice or click
                outside this box to cancel.
              </p>
              <Elements stripe={stripePromise}>
                <StripeForm />
              </Elements>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </main>
    // <main className={styles["onboarding"]}>
    //   <div className={styles["pricing-widget"]}>
    //     {PLANS.map((plan) => (
    //       <div key={plan.name} className={styles["plan"]}>
    //         <h2>{plan.name}</h2>

    //         <button onClick={() => handlePlanClick(plan)}> Start {plan.name} Plan</button>
    //         <ul>
    //           {plan.features.map((feature) => (
    //             <li key={feature}>{feature}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     ))}

    //     {selectedPlan && (
    //       <div className={styles["modal-overlay"]} onClick={closeModal}>
    //         <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
    //           <h2>{selectedPlan.name} Plan</h2>
    //           <p>
    //             You have selected the {selectedPlan.name} Plan. Proceed with your choice or click
    //             outside this box to cancel.
    //           </p>
    //           <Elements stripe={stripePromise}>
    //             <StripeForm />
    //           </Elements>
    //           <button onClick={closeModal}>Close</button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </main>
  );
}

export default SignupPlan;
