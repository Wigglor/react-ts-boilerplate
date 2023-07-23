import { ReactElement } from "react";
import styles from "./ErrorMsg.module.scss";

interface ErrorMessageProps {
  message: Error;
}

const ErrorMsg: React.FC<ErrorMessageProps> = ({ message }): ReactElement => {
  //   return <div className={styles.error}>Error Occurred! Please try again.</div>;
  console.log(message.message);
  return <div className={styles.error}>{message.message}</div>;
};

export default ErrorMsg;
