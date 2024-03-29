import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";

const stripePromise = loadStripe("your_publishable_key_here");

type FormData = {
  workspace: string;
  email: string;
  plan: string;
  card: any;
};

type Plan = {
  name: string;
  features: string[];
};

const PLANS = [
  {
    name: "TIER1",
    features: ["1 User", "1GB Storage", "Community Support"],
  },
  {
    name: "TIER2",
    features: ["5 Users", "50GB Storage", "Email Support"],
  },
  {
    name: "TIER3",
    features: ["20 Users", "1TB Storage", "24/7 Premium Support"],
  },
];

// function StripeForm() {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<FormData>();
//   const [workspaceName, setWorkspaceName] = useState<string>("");
//   const stripe = useStripe();
//   const elements = useElements();

//   const onSubmit = async (data: FormData) => {
//     if (!stripe || !elements) return;

//     const setupResponse = await axiosPrivate.post(
//       "/completesetup",
//       JSON.stringify({ name: data.workspace, accountEmail: data.email, plan: data.plan }),
//       {
//         withCredentials: true,
//       },
//     );

//     if (!setupResponse) {
//       console.error("Account creation failed");
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     const result = await stripe.createToken(card as any);

//     if (result.error) {
//       console.error(result.error.message);
//     } else {
//       // Send the token to your server for further processing
//       console.log("sending stripe request");
//       /*const paymentResponse = await fetch("/process-payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: result.token }),
//       });

//       if (!paymentResponse.ok) {
//         console.error("Payment failed");
//         return;
//       }*/

//       // Handle successful payment
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label htmlFor="workspace">Fill in Workspace Name</label>
//       <input
//         id="workspace"
//         type="text"
//         placeholder="Account Name"
//         {...register("workspace", {
//           required: "required",
//           minLength: {
//             value: 5,
//             message: "min length is 5",
//           },
//         })}
//       />
//       {errors.workspace && <p>This field is required</p>}
//       <label htmlFor="email">email</label>
//       <input
//         id="email"
//         {...register("email", {
//           required: "required",
//           pattern: {
//             value: /\S+@\S+\.\S+/,
//             message: "Entered value does not match email format",
//           },
//         })}
//         type="email"
//       />

//       <Controller
//         name="card"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <CardElement {...field} />}
//       />
//       <button type="submit" disabled={!stripe}>
//         Sign Up
//       </button>
//     </form>
//   );
// }

function CompleteSignup() {
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const setupResponse = await axiosPrivate.post(
        "/completesetup",
        JSON.stringify({
          name: data.workspace,
          accountEmail: data.email,
          plan: selectedPlan,
        }),
        {
          withCredentials: true,
        },
      );
      setAuth({
        user: setupResponse.data.result.user,
        accessToken: setupResponse.data.result.accessToken,
        role: setupResponse.data.result.role,
        setup: setupResponse.data.result.setup,
        currentPeriodEnds:
          setupResponse?.data.user.memberships[0].company.account.currentPeriodEnds,
        plan: setupResponse?.data.user.memberships[0].company.account.plan.name,
      });
      navigate("/", { replace: true });
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.log(error);
    }
    setLoading(false);
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
              {/* <Elements stripe={stripePromise}>
                <StripeForm />
              </Elements> */}
              {
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="workspace">Fill in Workspace Name</label>
                  <input
                    id="workspace"
                    type="text"
                    placeholder="Account Name"
                    {...register("workspace", {
                      required: "required",
                      minLength: {
                        value: 5,
                        message: "min length is 5",
                      },
                    })}
                  />
                  {errors.workspace && <p>This field is required</p>}
                  <label htmlFor="email">email</label>
                  <input
                    id="email"
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                    type="email"
                  />
                  {errors.email && <p>This field is required</p>}
                  {/* 
                <Controller
                  name="card"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <CardElement {...field} />}
                /> */}
                  <button type="submit" disabled={loading}>
                    {loading ? "Signing Up" : "Sign Up"}
                  </button>
                </form>
              }
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
    //           {/* <Elements stripe={stripePromise}>
    //             <StripeForm />
    //           </Elements> */}
    //           {
    //             <form onSubmit={handleSubmit(onSubmit)}>
    //               <label htmlFor="workspace">Fill in Workspace Name</label>
    //               <input
    //                 id="workspace"
    //                 type="text"
    //                 placeholder="Account Name"
    //                 {...register("workspace", {
    //                   required: "required",
    //                   minLength: {
    //                     value: 5,
    //                     message: "min length is 5",
    //                   },
    //                 })}
    //               />
    //               {errors.workspace && <p>This field is required</p>}
    //               <label htmlFor="email">email</label>
    //               <input
    //                 id="email"
    //                 {...register("email", {
    //                   required: "required",
    //                   pattern: {
    //                     value: /\S+@\S+\.\S+/,
    //                     message: "Entered value does not match email format",
    //                   },
    //                 })}
    //                 type="email"
    //               />
    //               {errors.email && <p>This field is required</p>}
    //               {/*
    //             <Controller
    //               name="card"
    //               control={control}
    //               defaultValue=""
    //               render={({ field }) => <CardElement {...field} />}
    //             /> */}
    //               <button type="submit" disabled={loading}>
    //                 {loading ? "Signing Up" : "Sign Up"}
    //               </button>
    //             </form>
    //           }
    //           <button onClick={closeModal}>Close</button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </main>
  );
}

export default CompleteSignup;
