import { ReactElement, useEffect } from "react";
import axios from "../../api/axios";

const SocialCallback = (): ReactElement => {
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
          // JSON.stringify(AwsBody),
          // {
          //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
          //   // withCredentials: true,
          // },
        );
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
    socialToken();
  }, []);
  return <h1>SocialCallback</h1>;
};

export default SocialCallback;
