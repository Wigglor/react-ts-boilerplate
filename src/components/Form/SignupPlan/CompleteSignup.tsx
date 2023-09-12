import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import styles from "./CompleteSignup.module.scss";

const stripePromise = loadStripe("your_publishable_key_here");

type FormData = {
  workspace: string;
  email: string;
  plan: string;
  card: any;
};

function CompleteSignup() {
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const setupResponse = await axiosPrivate.post(
        "/completesetup",
        JSON.stringify({
          name: data.workspace,
          accountEmail: data.email,
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
      });
      navigate("/", { replace: true });
      console.log(JSON.stringify(setupResponse.data));
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <main className={styles["onboarding"]}>
      <div className={styles["onboarding-setup"]}>
        {
          <form onSubmit={handleSubmit(onSubmit)} className={styles["onboarding-setup__form"]}>
            <label htmlFor="workspace">Please name your account</label>
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

            <button type="submit" disabled={loading}>
              {loading ? "Signing Up" : "Continue"}
            </button>
          </form>
        }
      </div>
    </main>
  );
}

export default CompleteSignup;
