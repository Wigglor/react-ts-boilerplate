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
      emailBody: string;
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
        <h1>My inbox: {inboxName}</h1>
        <h2>Number of emails: {aliases?.data.Count}</h2>
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
                  <li>{item.emailBody}</li>
                </div>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative group">
          <img
            className="w-full h-36 sm:h-[170px] object-cover rounded-t-xl"
            src="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
            alt="Image Description"
          ></img>

          <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
            <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <div className="hs-tooltip inline-block">
                <a
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Download
                </span>
              </div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmsh"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Share
                </span>
              </div>

              <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center gap-x-3">
          <span className="flex flex-shrink-0 justify-center items-center size-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 text-gray-500 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-3.5 sm:size-5"
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
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </span>

          <div className="grow truncate">
            <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              cover_image.jpg
            </p>
            <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
              James Feb 25th, 2023
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative group">
          <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
            <svg
              className="flex-shrink-0 size-12 text-gray-400 dark:text-neutral-600"
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
              <line x1="21" x2="3" y1="6" y2="6" />
              <line x1="15" x2="3" y1="12" y2="12" />
              <line x1="17" x2="3" y1="18" y2="18" />
            </svg>
          </div>

          <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
            <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <div className="hs-tooltip inline-block">
                <a
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Download
                </span>
              </div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmsh"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Share
                </span>
              </div>

              <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center gap-x-3">
          <span className="flex flex-shrink-0 justify-center items-center size-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 text-gray-500 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-3.5 sm:size-5"
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
              <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M2 13v-1h6v1" />
              <path d="M5 12v6" />
              <path d="M4 18h2" />
            </svg>
          </span>

          <div className="grow truncate">
            <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              project notes.html
            </p>
            <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
              James Feb 6th, 2023
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative group">
          <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
            <svg
              className="flex-shrink-0 size-12 text-gray-400 dark:text-neutral-600"
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
              <line x1="21" x2="3" y1="6" y2="6" />
              <line x1="15" x2="3" y1="12" y2="12" />
              <line x1="17" x2="3" y1="18" y2="18" />
            </svg>
          </div>

          <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
            <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <div className="hs-tooltip inline-block">
                <a
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Download
                </span>
              </div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmsh"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Share
                </span>
              </div>

              <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center gap-x-3">
          <span className="flex flex-shrink-0 justify-center items-center size-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 text-gray-500 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-3.5 sm:size-5"
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
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>

          <div className="grow truncate">
            <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              error.txt
            </p>
            <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
              James Jan 18th, 2023
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative group">
          <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
            <svg
              className="flex-shrink-0 size-12 text-gray-400 dark:text-neutral-600"
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
              <line x1="21" x2="3" y1="6" y2="6" />
              <line x1="15" x2="3" y1="12" y2="12" />
              <line x1="17" x2="3" y1="18" y2="18" />
            </svg>
          </div>

          <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
            <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <div className="hs-tooltip inline-block">
                <a
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Download
                </span>
              </div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmsh"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Share
                </span>
              </div>

              <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center gap-x-3">
          <span className="flex flex-shrink-0 justify-center items-center size-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 text-gray-500 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-3.5 sm:size-5"
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
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>

          <div className="grow truncate">
            <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              gulpfile.js
            </p>
            <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
              James Feb 25th, 2022
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative group">
          <img
            className="w-full h-36 sm:h-[170px] object-cover rounded-t-xl"
            src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
            alt="Image Description"
          ></img>

          <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
            <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <div className="hs-tooltip inline-block">
                <a
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Download
                </span>
              </div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmsh"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Share
                </span>
              </div>

              <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center gap-x-3">
          <span className="flex flex-shrink-0 justify-center items-center size-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 text-gray-500 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-3.5 sm:size-5"
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
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </span>

          <div className="grow truncate">
            <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              gradient.png
            </p>
            <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
              James Feb 25th, 2022
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative group">
          <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
            <svg
              className="flex-shrink-0 size-12 text-gray-400 dark:text-neutral-600"
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
              <line x1="21" x2="3" y1="6" y2="6" />
              <line x1="15" x2="3" y1="12" y2="12" />
              <line x1="17" x2="3" y1="18" y2="18" />
            </svg>
          </div>

          <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
            <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <div className="hs-tooltip inline-block">
                <a
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Download
                </span>
              </div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmsh"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Share
                </span>
              </div>

              <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center gap-x-3">
          <span className="flex flex-shrink-0 justify-center items-center size-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 text-gray-500 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-3.5 sm:size-5"
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
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <circle cx="10" cy="12" r="2" />
              <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" />
            </svg>
          </span>

          <div className="grow truncate">
            <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              screenshot_2023-02-09 00.01.18.jpg
            </p>
            <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
              James Sep 2nd, 2022
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative group">
          <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
            <svg
              className="flex-shrink-0 size-16"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 32C14.2773 32 16.6667 29.6106 16.6667 26.6666V21.3333H11.3333C8.38933 21.3333 6 23.7226 6 26.6666C6 29.6106 8.38933 32 11.3333 32Z"
                fill="#0ACF83"
              />
              <path
                d="M6 16C6 13.056 8.38933 10.6667 11.3333 10.6667H16.6667V21.3334H11.3333C8.38933 21.3334 6 18.944 6 16Z"
                fill="#A259FF"
              />
              <path
                d="M6 5.33333C6 2.38933 8.38933 0 11.3333 0H16.6667V10.6667H11.3333C8.38933 10.6667 6 8.27733 6 5.33333Z"
                fill="#F24E1E"
              />
              <path
                d="M16.6667 0H22C24.944 0 27.3334 2.38933 27.3334 5.33333C27.3334 8.27733 24.944 10.6667 22 10.6667H16.6667V0Z"
                fill="#FF7262"
              />
              <path
                d="M27.3334 16C27.3334 18.944 24.944 21.3334 22 21.3334C19.056 21.3334 16.6667 18.944 16.6667 16C16.6667 13.056 19.056 10.6667 22 10.6667C24.944 10.6667 27.3334 13.056 27.3334 16Z"
                fill="#1ABCFE"
              />
            </svg>
          </div>

          <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
            <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <div className="hs-tooltip inline-block">
                <a
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Download
                </span>
              </div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmsh"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Share
                </span>
              </div>

              <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center gap-x-3">
          <span className="flex flex-shrink-0 justify-center items-center size-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 text-gray-500 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-3.5 sm:size-5"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 32C14.2773 32 16.6667 29.6106 16.6667 26.6666V21.3333H11.3333C8.38933 21.3333 6 23.7226 6 26.6666C6 29.6106 8.38933 32 11.3333 32Z"
                fill="#0ACF83"
              />
              <path
                d="M6 16C6 13.056 8.38933 10.6667 11.3333 10.6667H16.6667V21.3334H11.3333C8.38933 21.3334 6 18.944 6 16Z"
                fill="#A259FF"
              />
              <path
                d="M6 5.33333C6 2.38933 8.38933 0 11.3333 0H16.6667V10.6667H11.3333C8.38933 10.6667 6 8.27733 6 5.33333Z"
                fill="#F24E1E"
              />
              <path
                d="M16.6667 0H22C24.944 0 27.3334 2.38933 27.3334 5.33333C27.3334 8.27733 24.944 10.6667 22 10.6667H16.6667V0Z"
                fill="#FF7262"
              />
              <path
                d="M27.3334 16C27.3334 18.944 24.944 21.3334 22 21.3334C19.056 21.3334 16.6667 18.944 16.6667 16C16.6667 13.056 19.056 10.6667 22 10.6667C24.944 10.6667 27.3334 13.056 27.3334 16Z"
                fill="#1ABCFE"
              />
            </svg>
          </span>

          <div className="grow truncate">
            <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              Preline UI Figma.fig
            </p>
            <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
              James Jan 20th, 2021
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative group">
          <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
            <svg
              className="flex-shrink-0 size-16"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                fill="#21A366"
              />
              <path d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z" fill="#107C41" />
              <path
                d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                fill="#33C481"
              />
              <path
                d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                fill="#185C37"
              />
              <path d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z" fill="#107C41" />
              <path
                opacity="0.1"
                d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                fill="black"
              />
              <path
                opacity="0.2"
                d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                fill="black"
              />
              <path
                opacity="0.2"
                d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                fill="black"
              />
              <path
                opacity="0.2"
                d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                fill="black"
              />
              <path
                d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                fill="#107C41"
              />
              <path
                d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
            <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <div className="hs-tooltip inline-block">
                <a
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Download
                </span>
              </div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmsh"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Share
                </span>
              </div>

              <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center gap-x-3">
          <span className="flex flex-shrink-0 justify-center items-center size-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 text-gray-500 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-3.5 sm:size-5"
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
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </span>

          <div className="grow truncate">
            <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              weekly_report.xls
            </p>
            <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
              James Aug 5th, 2021
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative group">
          <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
            <svg
              className="flex-shrink-0 size-12 text-gray-400 dark:text-neutral-600"
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
              <line x1="21" x2="3" y1="6" y2="6" />
              <line x1="15" x2="3" y1="12" y2="12" />
              <line x1="17" x2="3" y1="18" y2="18" />
            </svg>
          </div>

          <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
            <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <div className="hs-tooltip inline-block">
                <a
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  target="_blank"
                  download
                  rel="noreferrer"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </a>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Download
                </span>
              </div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmsh"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Share
                </span>
              </div>

              <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </button>

                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 flex items-center gap-x-3">
          <span className="flex flex-shrink-0 justify-center items-center size-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 text-gray-500 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-3.5 sm:size-5"
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
              <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M2 13v-1h6v1" />
              <path d="M5 12v6" />
              <path d="M4 18h2" />
            </svg>
          </span>

          <div className="grow truncate">
            <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
              weekly_report.xls
            </p>
            <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
              James Oct 17th, 2021
            </p>
          </div>
        </div>
      </div>

      <div
        id="hs-pro-dupfmsh"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="relative w-full max-h-full overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
            <div className="py-3 px-4 flex justify-between items-center border-b dark:border-neutral-700">
              <h3 className="font-semibold text-gray-800 dark:text-neutral-200">Share this file</h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                data-hs-overlay="#hs-pro-dupfmsh"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <form>
                <div className="p-4 space-y-4">
                  <input
                    type="text"
                    className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                    placeholder="Search for team or person"
                  ></input>

                  <textarea
                    id="hs-pro-daemdc"
                    className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                    placeholder="Add a message, if you’d like."
                  ></textarea>

                  <div className="p-3 flex items-center gap-x-3 border border-gray-200 rounded-xl dark:border-neutral-700">
                    <img
                      className="size-[38px] object-cover rounded-md"
                      src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                      alt="Image Description"
                    ></img>

                    <div className="grow truncate">
                      <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
                        gradient.png
                      </p>
                      <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
                        James Sep 2nd, 2022
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex justify-between gap-x-2">
                  <div className="w-full">
                    <input
                      id="hs-mshfctc"
                      type="text"
                      className="hidden"
                      value="https://www.figma.com/community/file/1179068859697769656"
                    ></input>

                    <button
                      type="button"
                      className="js-clipboard [--is-toggle-tooltip:false] hs-tooltip py-2 px-2.5 inline-flex justify-center items-center gap-x-1 rounded-lg bg-gray-100 font-medium text-xs text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                      data-clipboard-target="#hs-mshfctc"
                      data-clipboard-action="copy"
                      data-clipboard-success-text="Link copied"
                    >
                      <svg
                        className="flex-shrink-0 size-3"
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
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      <span className="js-clipboard-success-text">Copy link</span>
                    </button>
                  </div>

                  <div className="w-full flex justify-end items-center gap-x-2">
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex justify-center items-center text-start bg-white border border-gray-200 text-gray-800 text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dupfmsh"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-500"
                      data-hs-overlay="#hs-pro-dupfmsh"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        id="hs-pro-dupfmdl"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="relative w-full max-h-full overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
            <div className="absolute top-2 end-4 z-10">
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                data-hs-overlay="#hs-pro-dupfmdl"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
                Are you sure?
              </h3>
              <p className="mt-1 text-gray-500 dark:text-neutral-500">
                Are you sure you want to delete this file?
              </p>

              <div className="mt-4 flex justify-end gap-x-3">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#@@cancelButtonID"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Yes, I’m sure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inboxes;
