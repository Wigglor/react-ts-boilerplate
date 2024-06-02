import { ReactElement, useState } from "react";
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
      emailBody: string;
      emailSubject: string;
      emailSender: string;
      dkimVerdict: string;
      spfVerdict: string;
    }[];
  };
};

type AliasInput = {
  inboxName: string;
};

const Email = (): ReactElement => {
  const [addInbox, setAddInbox] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aliases, setEmails] = useState<Email>();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { emailContent } = location.state || { name: "Unknown" };

  //   if (!emailStatus) {
  //     return <h1 className="p-6 bg-gray-800 text-gray-100">Loading...</h1>;
  //   }
  function getTextFromHTML(html: string): string {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  function countWords(text: string): number {
    // Use a regular expression to match words (considering words as sequences of alphanumeric characters)
    const words = text.match(/\b\w+\b/g);
    return words ? words.length : 0;
  }

  const emailText = getTextFromHTML(emailContent);

  const wordCount = countWords(emailText);

  return (
    <>
      <div className="py-3">
        <h1>Word Count: {wordCount}</h1>
        <div
          //   className="max-w-full break-words overflow-hidden"
          dangerouslySetInnerHTML={{ __html: emailContent }}
        ></div>
      </div>
    </>
  );
};

export default Email;
