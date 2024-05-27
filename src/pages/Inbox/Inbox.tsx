import { ReactElement, useState } from "react";
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
  const { name } = location.state || { name: "Unknown" };

  return (
    <>
      <div className="py-3">My inbox</div>
    </>
  );
};

export default Inboxes;
