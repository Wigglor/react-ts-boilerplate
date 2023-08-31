import { CardElement, /*Elements,*/ useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { axiosPrivate } from "../../../api/axios";
import styles from "./SignupPlan.module.scss";

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

function StripeForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (data: FormData) => {
    if (!stripe || !elements) return;

    const setupResponse = await axiosPrivate.post(
      "/completesetup",
      JSON.stringify({ name: data.workspace, accountEmail: data.email, plan: data.plan }),
      {
        withCredentials: true,
      },
    ); /*
    Sample Response

    {
    "result": {
        "user": {
            "sub": "189b0494-4a83-4b39-8c07-a1a340051af8",
            "iss": "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_oVZkdo5LN",
            "client_id": "5j3g7ugnf2eg9q21h2r8ffqg2g",
            "origin_jti": "b83d9d43-d8b2-4377-bfba-202d45a69af8",
            "event_id": "0a0da5eb-9cfb-4dc3-9695-7f46291f7d16",
            "token_use": "access",
            "scope": "aws.cognito.signin.user.admin",
            "auth_time": 1693418340,
            "exp": 1693418640,
            "iat": 1693418340,
            "jti": "bd7a8cf0-c6a3-4506-ba5e-22311c7729c3",
            "username": "jigope3343"
        },
        "token": "eyJraWQiOiJMM1VkN1hnQlpaK09PdkdPaVdPZ29uejhUVktFQXN6NmptYUs4YmY3Skk0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxODliMDQ5NC00YTgzLTRiMzktOGMwNy1hMWEzNDAwNTFhZjgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX29WWmtkbzVMTiIsImNsaWVudF9pZCI6IjVqM2c3dWduZjJlZzlxMjFoMnI4ZmZxZzJnIiwib3JpZ2luX2p0aSI6ImI4M2Q5ZDQzLWQ4YjItNDM3Ny1iZmJhLTIwMmQ0NWE2OWFmOCIsImV2ZW50X2lkIjoiMGEwZGE1ZWItOWNmYi00ZGMzLTk2OTUtN2Y0NjI5MWY3ZDE2IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY5MzQxODM0MCwiZXhwIjoxNjkzNDE4NjQwLCJpYXQiOjE2OTM0MTgzNDAsImp0aSI6ImJkN2E4Y2YwLWM2YTMtNDUwNi1iYTVlLTIyMzExYzc3MjljMyIsInVzZXJuYW1lIjoiamlnb3BlMzM0MyJ9.bz5s3tQ1t0Gmvv2eKd0qdXU41GoffEqg2aETiLOILN4C1KQkVRb4XO7kY9FbB2uLUGlcEUHANU0uaSoYqH51f8XPGoMwWlGzyLyUxdKHLsaZzVQn5jc7mcAYSFyyfxtOgBuOhDSuXnaYaeWuA2S0dhgaOnJddj90kLRiGfKcUX3p2PUhER5HfAg9_FXzhes1dR_xfBUnrmNkMkDUTZuaUxuEpBJqXc6_pO8cECW7YG5IdnghLagLAg2c7CMt8T_l7CV1GajdwkPbPxZuzpTcvVurwAQf-rQAHg246cycAq9ltGwzQf6xCCCwGs6GGswqsDUo2bsVCKhyMMa2TxLJEA",
        "jwt": {
            "sub": "189b0494-4a83-4b39-8c07-a1a340051af8",
            "iss": "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_oVZkdo5LN",
            "client_id": "5j3g7ugnf2eg9q21h2r8ffqg2g",
            "origin_jti": "b83d9d43-d8b2-4377-bfba-202d45a69af8",
            "event_id": "0a0da5eb-9cfb-4dc3-9695-7f46291f7d16",
            "token_use": "access",
            "scope": "aws.cognito.signin.user.admin",
            "auth_time": 1693418340,
            "exp": 1693418640,
            "iat": 1693418340,
            "jti": "bd7a8cf0-c6a3-4506-ba5e-22311c7729c3",
            "username": "jigope3343"
        },
        "result": [
            {
                "accounts": {
                    "createdAt": "2023-08-30T17:59:06.263Z",
                    "updatedAt": "2023-08-30T17:59:06.263Z",
                    "id": "807f15b9-c4f1-4952-bc90-35913f0fc24e",
                    "planId": "dc256c39-f16d-4255-a59f-a58d055c480e",
                    "features": [
                        "feature1"
                    ],
                    "stripeSubscriptionId": "89cdb679-d211-4a5b-b75b-36cdecaf8017",
                    "stripeCustomerId": "a835790c-ef66-41a4-b57e-62b18169cd28",
                    "currentPeriodEnds": "2023-08-30T17:59:06.266Z"
                }
            },
            {
                "memberships": {
                    "createdAt": "2023-08-30T17:59:06.263Z",
                    "updatedAt": "2023-08-30T17:59:06.263Z",
                    "id": "ed2888a2-a4b7-4343-bf1b-b1653c836d9b",
                    "roleAccess": "ADMIN",
                    "accountEmail": "jigope3343@trazeco.com",
                    "companyId": "e1f515d1-cd86-48e7-bde9-583bf18acd1d",
                    "userId": "b514dd94-8bcb-41cd-b9df-739296728b5a"
                }
            },
            {
                "user": {
                    "createdAt": "2023-08-30T16:19:46.131Z",
                    "updatedAt": "2023-08-30T17:59:06.263Z",
                    "id": "b514dd94-8bcb-41cd-b9df-739296728b5a",
                    "cognitoId": "189b0494-4a83-4b39-8c07-a1a340051af8",
                    "firstName": "jigope",
                    "lastName": "trazeco",
                    "userName": "jigope3343",
                    "email": "jigope3343@trazeco.com",
                    "roleAccess": "ADMIN",
                    "verificationStatus": "VERIFIED",
                    "setup": "COMPLETED"
                }
            }
        ]
    }
}
    */

    if (!setupResponse) {
      console.error("Account creation failed");
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card as any);

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Send the token to your server for further processing
      console.log("sending stripe request");
      /*const paymentResponse = await fetch("/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: result.token }),
      });

      if (!paymentResponse.ok) {
        console.error("Payment failed");
        return;
      }*/

      // Handle successful payment
    }
  };

  return (
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

      <Controller
        name="card"
        control={control}
        defaultValue=""
        render={({ field }) => <CardElement {...field} />}
      />
      <button type="submit" disabled={!stripe}>
        Sign Up
      </button>
    </form>
  );
}

function SignupPlan2() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  return (
    <main className={styles["onboarding"]}>
      <div className={styles["pricing-widget"]}>
        {PLANS.map((plan) => (
          <div key={plan.name} className={styles["plan"]}>
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
          <div className={styles["modal-overlay"]} onClick={closeModal}>
            <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
              <h2>{selectedPlan.name} Plan</h2>
              <p>
                You have selected the {selectedPlan.name} Plan. Proceed with your choice or click
                outside this box to cancel.
              </p>
              {/* <Elements stripe={stripePromise}>
                <StripeForm />
              </Elements> */}
              {StripeForm()}
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default SignupPlan2;
