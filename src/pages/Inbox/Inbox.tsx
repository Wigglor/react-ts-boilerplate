import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

type Email = {
  data: {
    Count: number;
    Items: {
      dmarcVerdict: string;
      displayEmail: string;
      emailReceived: string;
      virusVerdict: string;
      emailAlias: string;
      createdAt: string;
      spamVerdict: string;
      s3Id: string;
    }[];
  };
};

type AliasInput = {
  inboxName: string;
};

const Inboxes = (): ReactElement => {
  const [addInbox, setAddInbox] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aliases, setEmails] = useState<Email>();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { inboxName, alias } = location.state || { name: "Unknown" };

  useEffect(() => {
    const controller = new AbortController();
    const getEmails = async () => {
      try {
        const response: ApiResponse<Email> = await axiosPrivate.post(
          "/fetch-emails",

          JSON.stringify({ emailAlias: alias }),
          {
            signal: controller.signal,
            withCredentials: true,
          },
        );

        if (response.data.data.Items.length > 0) {
          setEmailStatus(true);
          setEmails(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getEmails();

    return () => {
      controller.abort();
    };
  }, []);

  if (!emailStatus) {
    return <h1 className="p-6 bg-gray-800 text-gray-100">Loading...</h1>;
  }

  return (
    <>
      <div className="py-3">
        <h1></h1>My inbox: {inboxName}
      </div>
      {aliases && (
        <>
          <div>
            <ul className="">
              {aliases.data.Items.map((item) => (
                <div className="text-gray-100 bg-green-700" key={item.s3Id}>
                  <li>email received: {item.emailReceived}</li>
                  <li>email: {item.emailAlias}</li>
                  <li>dmarcVerdict: {item.dmarcVerdict}</li>
                  <li>spamVerdict: {item.spamVerdict}</li>
                  <li>virusVerdict: {item.virusVerdict}</li>
                </div>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Inboxes;
