import { ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useWorkSpaces from "../../hooks/useWorkSpaces";

interface Item {
  company: {
    name: string;
    id: string;
  };
}

const SocialCallback = (): ReactElement => {
  const { setAuth } = useAuth();
  const { setWorkSpaces } = useWorkSpaces();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    async function socialToken() {
      try {
        const response = await axios.post(
          "/social-token",
          { code: code },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        setAuth({
          user: response.data.user.userName,
          accessToken: response.data.data.access_token,
          role: response.data.user.userName,
          setup: response.data.user.setup,
          currentPeriodEnds:
            null /*response?.data.user.memberships[0]?.company?.account.currentPeriodEnds,*/, // CHANGE THIS!!!
          // plan: "" /*response?.data.user.memberships[0]?.company?.account.plan?.name,*/, // CHANGE THIS!!!
          plan: undefined /*response?.data.user.memberships[0]?.company?.account.plan?.name,*/, // CHANGE THIS!!!
        });

        // const workSpaces = response?.data.user.memberships.map((item: Item) => {
        //   return { name: item.company.name, id: item.company.id };
        // }); // extend this and return obj with company id etc as well

        // setWorkSpaces({
        //   availableWorkSpaces: workSpaces,
        //   selectedWorkSpace: {
        //     name: response?.data.user.memberships[0].company.name,
        //     id: response?.data.user.memberships[0].company.id,
        //   },
        // });

        if (response.data.user.setup === "PENDING") {
          navigate("/onboarding", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } catch (err) {
        console.error(err);
      }
    }
    socialToken();
  }, []);
  return <h1>SocialCallback</h1>;
};

export default SocialCallback;
