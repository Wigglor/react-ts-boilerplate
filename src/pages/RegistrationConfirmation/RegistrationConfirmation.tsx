import { ReactElement } from "react";

const RegistrationConfirmation = (): ReactElement => {
  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="grid gap-12">
            <div>
              <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
                Registration Complete{" "}
              </h2>
            </div>

            <div className="space-y-6 lg:space-y-10">
              <div className="flex">
                <svg
                  className="flex-shrink-0 mt-2 h-6 w-6 text-gray-800 dark:text-white"
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
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <polyline points="3 6 12 13 21 6"></polyline>
                </svg>
                <div className="ms-5 sm:ms-8">
                  {/* <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Registration Complete
                  </h3> */}
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Please check your inbox to verify user
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationConfirmation;
