import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useWorkSpaces from "../../../hooks/useWorkSpaces";

const stripePromise = loadStripe("your_publishable_key_here");

type FormData = {
  workspace: string;
  email: string;
  plan: string;
  card: any;
};

function CompleteSignup() {
  const { setAuth } = useAuth();
  // const { setWorkSpaces } = useWorkSpaces();
  const { workspaceData, updateWorkspaceData } = useWorkSpaces();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // control,
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
          // accountEmail: data.email,
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
        // currentPeriodEnds:
        //   setupResponse?.data.user.memberships[0]?.company.account.currentPeriodEnds,
        currentPeriodEnds: new Date(),
        plan: undefined,
      });
      // updateWorkspaceData({
      //   availableWorkSpaces: [
      //     {
      //       name: setupResponse.data.result.company.name,
      //       id: setupResponse.data.result.company.id,
      //     },
      //   ],
      //   selectedWorkSpace: {
      //     name: setupResponse.data.result.company.name,
      //     id: setupResponse.data.result.company.id,
      //   },
      // });
      const newWorkspaceData = { ...workspaceData };
      console.log(`previous workspace state: ${JSON.stringify(workspaceData)}`);
      newWorkspaceData.availableWorkSpaces = [
        {
          name: setupResponse.data.result.company.name,
          id: setupResponse.data.result.company.id,
        },
      ];
      newWorkspaceData.selectedWorkSpace = {
        name: setupResponse.data.result.company.name,
        id: setupResponse.data.result.company.id,
      };
      updateWorkspaceData(newWorkspaceData);
      // setWorkSpaces({
      //   availableWorkSpaces: [
      //     {
      //       name: setupResponse.data.result.company.name,
      //       id: setupResponse.data.result.company.id,
      //     },
      //   ],
      //   selectedWorkSpace: {
      //     name: setupResponse.data.result.company.name,
      //     id: setupResponse.data.result.company.id,
      //   },
      // });
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
        {
          <form onSubmit={handleSubmit(onSubmit)}>
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
    // <main className={styles["onboarding"]}>
    //   <div className={styles["onboarding-setup"]}>
    //     {
    //       <form onSubmit={handleSubmit(onSubmit)} className={styles["onboarding-setup__form"]}>
    //         <label htmlFor="workspace">Please name your account</label>
    //         <input
    //           id="workspace"
    //           type="text"
    //           placeholder="Account Name"
    //           {...register("workspace", {
    //             required: "required",
    //             minLength: {
    //               value: 5,
    //               message: "min length is 5",
    //             },
    //           })}
    //         />
    //         {errors.workspace && <p>This field is required</p>}

    //         <button type="submit" disabled={loading}>
    //           {loading ? "Signing Up" : "Continue"}
    //         </button>
    //       </form>
    //     }
    //   </div>
    // </main>
  );
}

export default CompleteSignup;
