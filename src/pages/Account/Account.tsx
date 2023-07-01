import { ReactElement } from "react";
import styles from "./Account.module.scss";

const Account = (): ReactElement => {
  return (
    <main className={styles.Account}>
      <h1>Account</h1>
      <div className={styles.info}>
        <div>
          <div>
            <div>
              <p>
                <b>Account</b>
              </p>
            </div>
            <div>
              <p>
                <b>Username</b>
              </p>
            </div>
            <div>
              <p>
                <b>email</b>
              </p>
            </div>
            <div>
              <p>
                <b>Role Access</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
