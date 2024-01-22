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

  console.log("ONBOARDING!!!");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    async function socialToken() {
      try {
        const response = await axios.post(
          // "https://test-2023-10.auth.eu-north-1.amazoncognito.com/oauth2/token",
          "/social-token",
          // AwsBody.toString(),
          // AwsBody,
          { googleToken: code },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
          // JSON.stringify(AwsBody),
          // {
          //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
          //   // withCredentials: true,
          // },
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

        console.log(JSON.stringify(response));
        console.log(`user: ${JSON.stringify(response.data.user.setup)}`);
        console.log(`user: ${JSON.stringify(response.data.user)}`);
        console.log(`------------------------------------------------`);
        console.log(`userName: ${JSON.stringify(response.data.user.userName)}`);
        console.log(`accessToken: ${JSON.stringify(response.data.data.access_token)}`);
        console.log(`role: ${JSON.stringify(response.data.user.userName)}`);
        console.log(`setup: ${JSON.stringify(response.data.user.setup)}`);

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
          console.log("setup is PENDING");
          navigate("/onboarding", { replace: true });
        } else {
          console.log("setup is COMPLETED");
          //navigate("/", { replace: true });
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
