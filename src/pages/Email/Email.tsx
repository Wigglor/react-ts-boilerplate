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

  function parseHTML(html: string): Document {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }

  function countWords(text: string): number {
    // Use a regular expression to match words (considering words as sequences of alphanumeric characters)
    const words = text.match(/\b\w+\b/g);
    return words ? words.length : 0;
  }

  function countLinksInHTML(html: string): number {
    const doc = parseHTML(html);
    const links: NodeListOf<HTMLAnchorElement> = doc.querySelectorAll("a"); // Select all <a> tags
    return links.length;
  }

  function countImagesInHTML(html: string): number {
    const doc: Document = parseHTML(html);
    const images: NodeListOf<HTMLImageElement> = doc.querySelectorAll("img"); // Select all <img> tags
    return images.length;
  }

  const emailText = getTextFromHTML(emailContent);

  const wordCount = countWords(emailText);

  const linkCount: number = countLinksInHTML(emailContent);

  const imageCount: number = countImagesInHTML(emailContent);

  return (
    <>
      <div className="py-3">
        <div className="flex flex-col">
          <div className="relative overflow-hidden p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-sm before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-purple-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-purple-800/30 dark:before:via-transparent">
            <div className="relative z-10">
              <div className="flex justify-between gap-x-3">
                <span className="mb-3 inline-flex justify-center items-center size-8 md:size-10 rounded-lg bg-white text-gray-700 shadow dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                  <svg
                    className="flex-shrink-0 size-4 md:size-5 text-purple-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
              </div>

              <h2 className="text-sm md:text-base text-gray-800 dark:text-neutral-200">
                Word Count
              </h2>

              <div className="grid sm:flex sm:justify-between sm:items-center gap-1 sm:gap-3">
                <h3 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                  {wordCount}
                </h3>

                <div className="flex items-center -space-x-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <div className="relative overflow-hidden p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-sm before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-purple-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-purple-800/30 dark:before:via-transparent">
            <div className="relative z-10">
              <div className="flex justify-between gap-x-3">
                <span className="mb-3 inline-flex justify-center items-center size-8 md:size-10 rounded-lg bg-white text-gray-700 shadow dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                  <svg
                    className="flex-shrink-0 size-4 md:size-5 text-purple-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
              </div>

              <h2 className="text-sm md:text-base text-gray-800 dark:text-neutral-200">
                Link Count
              </h2>

              <div className="grid sm:flex sm:justify-between sm:items-center gap-1 sm:gap-3">
                <h3 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                  {linkCount}
                </h3>

                <div className="flex items-center -space-x-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <div className="relative overflow-hidden p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-sm before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-purple-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-purple-800/30 dark:before:via-transparent">
            <div className="relative z-10">
              <div className="flex justify-between gap-x-3">
                <span className="mb-3 inline-flex justify-center items-center size-8 md:size-10 rounded-lg bg-white text-gray-700 shadow dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                  <svg
                    className="flex-shrink-0 size-4 md:size-5 text-purple-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
              </div>

              <h2 className="text-sm md:text-base text-gray-800 dark:text-neutral-200">
                Image Count
              </h2>

              <div className="grid sm:flex sm:justify-between sm:items-center gap-1 sm:gap-3">
                <h3 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                  {imageCount}
                </h3>

                <div className="flex items-center -space-x-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          //   className="max-w-full break-words overflow-hidden"
          dangerouslySetInnerHTML={{ __html: emailContent }}
        ></div>
      </div>
    </>
  );
};

export default Email;
