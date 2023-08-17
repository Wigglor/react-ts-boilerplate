import { ReactElement } from "react";
import styles from "./Onboarding.module.scss";

const Onboarding = (): ReactElement => {
  return (
    <main className={styles["signup"]}>
      <div>
        <h1>Please finish Account Creation</h1>
      </div>
    </main>
  );
};

export default Onboarding;
