import { ReactElement } from "react";

interface ErrorMessageProps {
  message: Error;
}

const ErrorMsg: React.FC<ErrorMessageProps> = ({ message }): ReactElement => {
  //   return <div className={styles.error}>Error Occurred! Please try again.</div>;

  // return <div className={styles.error}>{message.message}</div>;
  return <div>{message.message}</div>;
};

export default ErrorMsg;
