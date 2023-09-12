import { ReactElement } from "react";
// import CompleteSignup from "../../components/Form/SignupPlan/CompleteSignup";
import CompleteSignup from "../../components/Form/SignupPlan/CompleteSignup";

const Onboarding = (): ReactElement => {
  console.log("ONBOARDING!!!");
  return (
    // <SignupPlan></SignupPlan>
    // <SignupPlan2 />
    <CompleteSignup />
    // <main>
    //   {/* <main className={styles["signup"]}> */}
    //   <div>
    //     <h1>Please finish Account Creation</h1>
    //   </div>
    // </main>
  );
};

export default Onboarding;
