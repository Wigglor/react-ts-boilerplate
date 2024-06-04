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
      <div className="border-b border-gray-200 dark:border-neutral-700">
        <div className="py-3 px-5 flex justify-between items-center gap-x-5">
          <h2 className="inline-block font-semibold text-gray-800 dark:text-neutral-200">
            Preline
          </h2>

          <div className="flex justify-end items-center gap-x-2">
            <div className="hs-dropdown [--auto-close:inside] [--placement:top-right] inline-flex">
              <button
                id="hs-pro-dnic"
                type="button"
                className="p-2 inline-flex items-center text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <svg
                  className="flex-shrink-0 me-2 size-3.5"
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
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                Today
                <svg
                  className="flex-shrink-0 ms-1.5 size-3.5"
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-[318px] transition-[opacity,margin] duration opacity-0 hidden z-50 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                aria-labelledby="hs-pro-dnic"
              >
                <div className="p-3 space-y-0.5">
                  <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                    <div className="col-span-1">
                      <button
                        type="button"
                        className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </button>
                    </div>
                    <div className="col-span-3 flex justify-center items-center gap-x-1">
                      <div className="relative">
                        <select
                          data-hs-select='{
                        "placeholder": "Select month",
                        "toggleTag": "<button type=\"button\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                        "dropdownClasses": "mt-2 z-50 w-32 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                      }'
                          className="hidden"
                        >
                          <option value="0">January</option>
                          <option value="1">February</option>
                          <option value="2">March</option>
                          <option value="3">April</option>
                          <option value="4">May</option>
                          <option value="5">June</option>
                          <option value="6" selected>
                            July
                          </option>
                          <option value="7">August</option>
                          <option value="8">September</option>
                          <option value="9">October</option>
                          <option value="10">November</option>
                          <option value="11">December</option>
                        </select>
                      </div>

                      <span className="text-gray-800 dark:text-neutral-200">/</span>

                      <div className="relative">
                        <select
                          data-hs-select='{
                        "placeholder": "Select year",
                        "toggleTag": "<button type=\"button\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                        "dropdownClasses": "mt-2 z-50 w-20 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                      }'
                          className="hidden"
                        >
                          <option selected>2023</option>
                          <option>2024</option>
                          <option>2025</option>
                          <option>2026</option>
                          <option>2027</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button
                        type="button"
                        className=" size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                      >
                        <svg
                          className="flex-shrink-0 size-4"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex pb-1.5">
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Mo
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Tu
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      We
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Th
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Fr
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Sa
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Su
                    </span>
                  </div>
                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                        disabled
                      >
                        26
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                        disabled
                      >
                        27
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                        disabled
                      >
                        28
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                        disabled
                      >
                        29
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                        disabled
                      >
                        30
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        1
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        2
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        3
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        4
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        5
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        6
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        7
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        8
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        9
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        10
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        11
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        12
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        13
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        14
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        15
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        16
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        17
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        18
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        19
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center bg-indigo-600 border border-transparent text-sm font-medium text-white hover:border-indigo-600 rounded-full dark:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:border-neutral-700"
                      >
                        20
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        21
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        22
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        23
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        24
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        25
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        26
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        27
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        28
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        29
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        30
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-indigo-600 focus:text-indigo-600 dark:text-neutral-200"
                      >
                        31
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-indigo-600 hover:text-indigo-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        disabled
                      >
                        1
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-indigo-600 hover:text-indigo-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        disabled
                      >
                        2
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-indigo-600 hover:text-indigo-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        disabled
                      >
                        3
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-indigo-600 hover:text-indigo-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        disabled
                      >
                        4
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-indigo-600 hover:text-indigo-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        disabled
                      >
                        5
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-indigo-600 hover:text-indigo-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        disabled
                      >
                        6
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="py-2 px-2.5 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500"
            >
              <svg
                className="hidden sm:block flex-shrink-0 size-3.5"
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add project
            </button>
          </div>
        </div>
      </div>
      <div className="py-4 px-5 space-y-4">
        <div className="grid sm:flex sm:justify-between sm:items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">
              $75,431.14 USD
            </span>
            <span className="inline-flex items-center gap-x-1 text-teal-600 rounded-full dark:text-teal-500">
              <svg
                className="inline-block size-5"
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
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              25.3%
            </span>
          </div>

          <div className="flex sm:justify-end items-center gap-x-4">
            <div className="inline-flex items-center">
              <span className="size-2.5 inline-block bg-indigo-500 rounded-sm me-2"></span>
              <span className="text-[13px] text-gray-600 dark:text-neutral-400">Income</span>
            </div>
            <div className="inline-flex items-center">
              <span className="size-2.5 inline-block bg-indigo-200 rounded-sm me-2 dark:bg-indigo-300"></span>
              <span className="text-[13px] text-gray-600 dark:text-neutral-400">Expenses</span>
            </div>
          </div>
        </div>

        <div id="hs-bar-chart" className="min-h-[365px] -mx-2"></div>
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
              <div
                key={item.s3Id}
                className="p-4 flex flex-col h-192 bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
              >
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
