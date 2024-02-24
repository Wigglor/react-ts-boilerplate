import { ReactElement, useEffect, useRef, useState } from "react";
import Dropdown from "../../components/UI/Dropdown";
type Workspace = {
  name: string;
  id: string;
};

interface ApiResponse {
  message: string;
}

const dropdownItems = [
  {
    id: "item1",
    label: "Option 1",
    onClick: () => console.log("Option 1 clicked"),
  },
  {
    id: "item2",
    label: "Option 2",
    onClick: () => console.log("Option 2 clicked"),
  },
  {
    id: "item3",
    label: "Option 3",
    onClick: () => console.log("Option 3 clicked"),
  },
];

const Home = (): ReactElement => {
  // const logout = useLogout();
  // const axiosPrivate = useAxiosPrivate();
  // const { workSpaces, setWorkSpaces } = useWorkSpaces();
  // const [stateSelectedWorkspace, setSelectedWorkspace] = useState<string>("");

  // const [testData, setTestData] = useState<string>(() => {
  //   const testData = "test string";
  //   return testData;
  // });
  // useEffect(() => {
  //   const workSpace: string | undefined = workSpaces.selectedWorkSpace?.name;

  //   setSelectedWorkspace(workSpace);
  // }, []);

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedWorkSpace_ = workSpaces.availableWorkSpaces.find(
  //     (wp: Workspace) => wp.name === event.target.value,
  //   );
  //   setSelectedWorkspace(event.target.value);
  //   setWorkSpaces((prevState) => {
  //     return { ...prevState, selectedWorkSpace: selectedWorkSpace_! };
  //   });
  // };

  // const signOut = async () => {
  //   await logout();
  // };
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  // const options = ["Option 1", "Option 2", "Option 3"]; // Example options

  // // Toggle dropdown open state
  // const toggleDropdown = () => setIsOpen(!isOpen);

  // // Handle option selection
  // const selectOption = (option: any) => {
  //   setSelectedOption(option);
  //   setIsOpen(false); // Close dropdown after selection
  // };

  // const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   }

  //   // Add event listener when the component mounts
  //   document.addEventListener("mousedown", handleClickOutside);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const options = ["Option 1", "Option 2", "Option 3"]; // Example options
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {selectedOption || "Select an option"}
        </button>
        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            role="listbox"
          >
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => selectOption(option)}
                role="option"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="relative">
        <select
          data-hs-select='{
      "placeholder": "Select option...",
      "toggleTag": "<button type=\"button\"></button>",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative -ms-2 py-1.5 ps-2.5 pe-6 w-full inline-flex flex-shrink-0 items-center gap-x-1.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700",
      "dropdownClasses": "mt-2 z-50 w-full p-1 space-y-0.5 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900",
      "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-1.5 px-2 w-full text-[13px] text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
      "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
    }'
          className="hidden"
        >
          <option value="">Choose</option>
          <option selected>Revenue</option>
          <option>Total sales</option>
          <option>New sales</option>
          <option>Refunds</option>
          <option>New subscriptions</option>
          <option>Trial conversion rate</option>
          <option>Affiliate revenue</option>
          <option>Affiliate clicks</option>
        </select>

        <div className="absolute top-1/2 end-3.5 -translate-y-1/2">
          <svg
            className="flex-shrink-0 w-3.5 h-3.5 text-gray-600 dark:text-gray-400"
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
        </div>
      </div>
      <div className="p-4">
        <Dropdown
          buttonLabel="Select Option"
          items={dropdownItems}
          className="my-2" // Optional: Additional Tailwind CSS classes for styling
        />
      </div>
      <div className="hs-dropdown relative inline-flex">
        <button
          id="hs-dropdown-how-it-works"
          type="button"
          className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
        >
          Actions
          <svg
            className="hs-dropdown-open:rotate-180 size-2.5 text-gray-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div
          className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-72 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
          aria-labelledby="hs-dropdown-how-it-works"
        ></div>
      </div>
      <div className="hs-dropdown relative inline-flex">
        <button
          id="hs-pro-dbrrtchmd"
          type="button"
          className="w-[34px] h-[34px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
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
          className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-44 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
          aria-labelledby="hs-pro-dbrrtchmd"
        >
          <div className="p-1">
            <button
              type="button"
              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <svg
                className="flex-shrink-0 w-3.5 h-3.5"
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
              Share reports
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <svg
                className="flex-shrink-0 w-3.5 h-3.5"
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
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
              View in fullscreen
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <svg
                className="flex-shrink-0 w-3.5 h-3.5"
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
                <path d="M3 3h6l6 18h6" />
                <path d="M14 3h7" />
              </svg>
              Connect other apps
            </button>

            <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

            <button
              type="button"
              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <svg
                className="flex-shrink-0 w-3.5 h-3.5"
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="9" x2="15" y1="10" y2="10" />
                <line x1="12" x2="12" y1="7" y2="13" />
              </svg>
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
      {/* <div className="hs-dropdown relative inline-flex">
        <button
          id="hs-pro-dbrrtchmd"
          type="button"
          className="w-[34px] h-[34px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
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
          className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-44 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
          aria-labelledby="hs-pro-dbrrtchmd"
        >
          <div className="p-1">
            <button
              type="button"
              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <svg
                className="flex-shrink-0 w-3.5 h-3.5"
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
              Share reports
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <svg
                className="flex-shrink-0 w-3.5 h-3.5"
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
                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
              View in fullscreen
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <svg
                className="flex-shrink-0 w-3.5 h-3.5"
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
                <path d="M3 3h6l6 18h6" />
                <path d="M14 3h7" />
              </svg>
              Connect other apps
            </button>

            <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

            <button
              type="button"
              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 disabled:pointer-events-none dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <svg
                className="flex-shrink-0 w-3.5 h-3.5"
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="9" x2="15" y1="10" y2="10" />
                <line x1="12" x2="12" y1="7" y2="13" />
              </svg>
              Submit Feedback
            </button>
          </div>
        </div>
      </div> */}
      {/* <div className="mt-4 ml-4">
        <div className="flex flex-col w-1/6 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div className="p-5 pb-3 flex justify-between items-center">
            <h2 className="inline-block font-semibold text-gray-800 dark:text-neutral-200">
              Total sales
            </h2>

            <div className="hs-dropdown inline-flex [--auto-close:inside]">
              <button
                id="hs-pro-dnic"
                type="button"
                className="p-2 inline-flex items-center text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                <svg
                  className="flex-shrink-0 me-2 w-3.5 h-3.5"
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
                  className="flex-shrink-0 ms-1.5 w-3.5 h-3.5"
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
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-[318px] transition-[opacity,margin] duration opacity-0 hidden z-50 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                aria-labelledby="hs-pro-dnic"
              >
                <div className="p-3 space-y-0.5">
                  <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                    <div className="col-span-1">
                      <button
                        type="button"
                        className="w-8 h-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                      >
                        <svg
                          className="flex-shrink-0 w-4 h-4"
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
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-gray-300 dark:focus:text-gray-300",
                        "dropdownClasses": "mt-2 z-50 w-32 max-h-[300px] p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-slate-800",
                        "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                      }'
                          className="hidden"
                        >
                          <option value="0">January</option>
                          <option value="1">February</option>
                          <option value="2">March</option>
                          <option value="3">April</option>
                          <option value="4">May</option>
                          <option value="5">June</option>
                          <option value="6">July</option>
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
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-gray-300 dark:focus:text-gray-300",
                        "dropdownClasses": "mt-2 z-50 w-20 max-h-[300px] p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-slate-800",
                        "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                      }'
                          className="hidden"
                        >
                          <option>2023</option>
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
                        className="w-8 h-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                      >
                        <svg
                          className="flex-shrink-0 w-4 h-4"
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
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        26
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        27
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        28
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        29
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        30
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        1
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        2
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        3
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        4
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        5
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        6
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        7
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        8
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        9
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        10
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        11
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        12
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        13
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        14
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        15
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        16
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        17
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        18
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        19
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center bg-blue-600 border border-transparent text-sm font-medium text-white hover:border-blue-600 rounded-full dark:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:border-neutral-700"
                      >
                        20
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        21
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        22
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        23
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        24
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        25
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        26
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        27
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        28
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        29
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        30
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        31
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        1
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        2
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        3
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        4
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        5
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        6
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-full pb-5 px-5 space-y-8">
            <h4 className="text-4xl font-medium text-gray-800 dark:text-neutral-200">
              <span className="-me-1.5 text-sm align-top text-gray-500 dark:text-neutral-500">
                $
              </span>
              43,350
            </h4>

            <ul className="space-y-3">
              <li className="flex justify-between items-center gap-x-2">
                <div>
                  <div className="flex items-center gap-x-2">
                    <div className="inline-block w-2.5 h-2.5 bg-blue-600 rounded-sm"></div>
                    <h2 className="inline-block align-middle text-gray-500 dark:text-neutral-400">
                      Store sales
                    </h2>
                  </div>
                </div>
                <div>
                  <span className="text-gray-800 dark:text-neutral-200">$51,392</span>
                  <span className="ms-3 min-w-[80px] inline-block text-gray-600 dark:text-neutral-400">
                    <svg
                      className="inline-block align-middle w-4 h-4 text-teal-500"
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
                    38.2%
                  </span>
                </div>
              </li>

              <li className="flex justify-between items-center gap-x-2">
                <div>
                  <div className="flex items-center gap-x-2">
                    <div className="inline-block w-2.5 h-2.5 bg-purple-600 rounded-sm"></div>
                    <h2 className="inline-block align-middle text-gray-500 dark:text-neutral-400">
                      Online sales
                    </h2>
                  </div>
                </div>
                <div>
                  <span className="text-gray-800 dark:text-neutral-200">$46,420</span>
                  <span className="ms-3 min-w-[80px] inline-block text-gray-600 dark:text-neutral-400">
                    <svg
                      className="inline-block align-middle w-4 h-4 text-teal-500"
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
                    5.9%
                  </span>
                </div>
              </li>

              <li className="flex justify-between items-center gap-x-2">
                <div>
                  <div className="flex items-center gap-x-2">
                    <div className="inline-block w-2.5 h-2.5 bg-gray-300 rounded-sm dark:bg-neutral-500"></div>
                    <h2 className="inline-block align-middle text-gray-500 dark:text-neutral-400">
                      Others
                    </h2>
                  </div>
                </div>
                <div>
                  <span className="text-gray-800 dark:text-neutral-200">$39,539</span>
                  <span className="ms-3 min-w-[80px] inline-block text-gray-600 dark:text-neutral-400">
                    <svg
                      className="inline-block align-middle w-4 h-4 text-red-500"
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
                      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                      <polyline points="16 17 22 17 22 11" />
                    </svg>
                    3.1%
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-5 pt-0 space-y-8">
            <div className="w-full">
              <div id="hs-total-sales-lines-chart" className="min-h-[115px]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <button
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {selectedOption || "Select an option"}
        </button>
        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            role="listbox"
          >
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => selectOption(option)}
                role="option"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </>

    //  { {data ? <div>{data.message}</div> : <div>Loading...</div>} */}
    // </main>
  );
};

export default Home;
