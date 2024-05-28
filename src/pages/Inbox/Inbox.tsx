import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

type Alias = {
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    alias: string;
    domainId: string;
    inboxName: string;
  }[];
};

type AliasInput = {
  inboxName: string;
};

const Inboxes = (): ReactElement => {
  const [addInbox, setAddInbox] = useState<boolean>(false);
  const [aliasStatus, setAliasStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aliases, setAliases] = useState<Alias>();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { inboxName, alias } = location.state || { name: "Unknown" };

  useEffect(() => {
    const controller = new AbortController();
    const getEmails = async () => {
      try {
        const response: ApiResponse<Alias> = await axiosPrivate.post(
          "/fetch-emails",

          JSON.stringify({ emailAlias: alias }),
          {
            signal: controller.signal,
            withCredentials: true,
          },
        );

        if (response.data.data.length > 0) {
          setAliasStatus(true);
          setAliases(response.data);
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

  return (
    <>
      <div className="py-3">My inbox: {inboxName}</div>
    </>
  );
};

export default Inboxes;
