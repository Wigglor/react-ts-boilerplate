import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

type AliasItems = {
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
};

type Email = {
  data: {
    Count: number;
    Items: AliasItems[];
  };
};

type EmailDates = {
  data: {
    Items: {
      emailReceived: Date;
    }[];
  };
};

const Inboxes = (): ReactElement => {
  const [addInbox, setAddInbox] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aliases, setEmails] = useState<Email>();
  const [receivedDate, setReceivedDate] = useState<EmailDates>();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const [searchVal, setSearchVal] = useState<string>("");
  const { inboxName, alias } = location.state || { name: "Unknown" };
  const { id } = useParams();

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

  useEffect(() => {
    const controller = new AbortController();
    const getEmailDates = async () => {
      try {
        const response: ApiResponse<EmailDates> = await axiosPrivate.post(
          "/email-interval",

          JSON.stringify({
            emailAlias: alias,
            // startDate: "2024-05-21T00:00:00",
            startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
            // endDate: "2024-06-02T23:59:59",
            endDate: new Date().toISOString(),
          }),
          {
            signal: controller.signal,
            withCredentials: true,
          },
        );
        const currentDate = new Date().toDateString();
        console.log(JSON.stringify(response));
        console.log(currentDate);
        if (response.data.data.Items.length > 0) {
          setReceivedDate(response.data);
        }

        // if (response.data.data.Items.length > 0) {
        //   setEmailStatus(true);
        //   setEmails(response.data);
        // }
      } catch (err) {
        console.error(err);
      }
    };
    getEmailDates();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredData = aliases?.data.Items.filter((item) =>
    item.emailBody.toLowerCase().includes(searchVal.toLowerCase()),
  ) as AliasItems[];

  if (!emailStatus) {
    return <h1 className="p-6 bg-gray-800 text-gray-100">Loading...</h1>;
  }

  return (
    <>
      <div className="py-3">
        <h1>
          My inbox: {inboxName} id: {id}
        </h1>
        <h2>Number of emails: {aliases?.data.Count}</h2>
      </div>

      <div className="sm:mx-7 p-5 space-y-4 mb-4 flex flex-col bg-gray-700 border border-stone-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="grid md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-5">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                <svg
                  className="flex-shrink-0 size-4 text-stone-500 dark:text-neutral-400"
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                onChange={(e) => setSearchVal(e.target.value)}
                type="text"
                value={searchVal}
                className="py-[7px] px-3 ps-10 block w-full bg-stone-100 border-transparent rounded-lg text-sm placeholder:text-stone-500 focus:border-gray-500 focus:ring-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
                placeholder="Search email"
              ></input>
            </div>
          </div>

          <div className="flex md:justify-end items-center gap-x-2">
            <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
              <button
                id="hs-pro-dupfind"
                type="button"
                className="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs rounded-lg border border-stone-200 bg-white text-stone-800 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                <svg
                  className="flex-shrink-0 size-3.5"
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
                  <line x1="21" x2="14" y1="4" y2="4" />
                  <line x1="10" x2="3" y1="4" y2="4" />
                  <line x1="21" x2="12" y1="12" y2="12" />
                  <line x1="8" x2="3" y1="12" y2="12" />
                  <line x1="21" x2="16" y1="20" y2="20" />
                  <line x1="12" x2="3" y1="20" y2="20" />
                  <line x1="14" x2="14" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="10" y2="14" />
                  <line x1="16" x2="16" y1="18" y2="22" />
                </svg>
                Filter
                <span className="font-medium text-[10px] py-0.5 px-[5px] bg-stone-800 text-white leading-3 rounded-full dark:bg-neutral-500">
                  7
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {aliases && (
        <div className="sm:mx-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* {aliases.data.Items.map((item) => ( */}
          {filteredData.map((item) => (
            <>
              <div className="p-4 flex flex-col h-192 bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex justify-between items-center gap-x-2">
                  <a
                    href="#"
                    className="mb-2 text-lg inline-flex items-center gap-x-1 text-gray-800 decoration-2  font-semibold hover:text-gray-900 focus:outline-none focus:underline focus:text-gray-900 dark:text-neutral-200 dark:hover:text-blue-900 dark:focus:outline-none dark:focus:text-blue-900"
                  >
                    {item.emailSubject}
                  </a>

                  <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                    <button
                      id="hs-pro-dupc1"
                      type="button"
                      className="size-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>

                    <div
                      className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                      aria-labelledby="hs-pro-dupc1"
                    >
                      <div className="p-1">
                        <button
                          type="button"
                          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          data-hs-overlay="#hs-pro-detm"
                        >
                          <svg
                            className="flex-shrink-0 size-3.5"
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
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                          Edit team
                        </button>
                        <button
                          type="button"
                          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          <svg
                            className="flex-shrink-0 size-3.5"
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
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          Add to favorites
                        </button>
                        <button
                          type="button"
                          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          <svg
                            className="flex-shrink-0 size-3.5"
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
                            <rect width="20" height="5" x="2" y="4" rx="2" />
                            <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                            <path d="M10 13h4" />
                          </svg>
                          Archive team
                        </button>

                        <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                        <button
                          type="button"
                          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                          data-hs-overlay="#hs-pro-dtlam"
                        >
                          <svg
                            className="flex-shrink-0 size-3.5"
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
                          Delete team
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                  <b>From:</b> {item.emailSender}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500 mb-3">
                  <b>Sent:</b> {item.emailReceived}
                </p>
                {/* <img
                  className="mb-4 w-full object-cover rounded-xl"
                  src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                  alt="Image Description"
                ></img> */}
                <div
                  className="max-w-full break-words overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: item.emailBody }}
                ></div>

                <div className="mt-3 -mx-1">
                  <div className="flex flex-col gap-y-2">
                    <div className="inline-flex flex-wrap gap-2">
                      <div>
                        {item.spamVerdict === "PASS" ? (
                          <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-check"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                            SPAM
                          </span>
                        ) : (
                          <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-alert"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" x2="12" y1="8" y2="12" />
                              <line x1="12" x2="12.01" y1="16" y2="16" />
                            </svg>
                            SPAM
                          </span>
                        )}
                      </div>
                      <div>
                        {item.dkimVerdict === "PASS" ? (
                          <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-check"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                            DKIM
                          </span>
                        ) : (
                          <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-alert"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" x2="12" y1="8" y2="12" />
                              <line x1="12" x2="12.01" y1="16" y2="16" />
                            </svg>
                            DKIM
                          </span>
                        )}
                      </div>
                      <div>
                        {item.spfVerdict === "PASS" ? (
                          <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-check"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                            SPF
                          </span>
                        ) : (
                          <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-alert"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" x2="12" y1="8" y2="12" />
                              <line x1="12" x2="12.01" y1="16" y2="16" />
                            </svg>
                            SPF
                          </span>
                        )}
                      </div>
                      <div>
                        {item.virusVerdict === "PASS" ? (
                          <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-check"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                            VIRUS
                          </span>
                        ) : (
                          <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-alert"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" x2="12" y1="8" y2="12" />
                              <line x1="12" x2="12.01" y1="16" y2="16" />
                            </svg>
                            Virus
                          </span>
                        )}
                      </div>

                      <div>
                        {item.dmarcVerdict === "PASS" ? (
                          <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-check"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                            DMARC
                          </span>
                        ) : (
                          <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-alert"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" x2="12" y1="8" y2="12" />
                              <line x1="12" x2="12.01" y1="16" y2="16" />
                            </svg>
                            DMARC
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <Link to={`/inboxes/${id}/${item.s3Id}`} state={{ emailContent: item.emailBody }}>
                    <button
                      type="button"
                      className="py-2 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
                      View Email
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ))}
          {/* </ul>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Inboxes;
