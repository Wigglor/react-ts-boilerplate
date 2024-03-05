import { ReactElement } from "react";

const Analytics = (): ReactElement => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 lg:gap-5">
        <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
            Total sales
          </h2>

          <div className="grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
            <div>
              <h4 className="text-lg text-stone-800 dark:text-neutral-200">
                $1,597,820.75
                <span className="inline-flex items-center gap-x-1 text-sm text-green-500">
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
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  35.8%
                </span>
              </h4>
            </div>

            <div className="md:text-end">
              <p className="text-sm text-stone-500 dark:text-neutral-400">1,347,935 orders</p>
            </div>
          </div>

          <div id="hs-total-sales-line-chart" className="min-h-[215px] md:min-h-[265px]"></div>

          <div className="flex justify-center items-center gap-x-4 mt-5">
            <div className="inline-flex items-center">
              <span className="w-2.5 h-2.5 inline-block bg-green-600 rounded-sm me-2"></span>
              <span className="text-[13px] text-stone-600 dark:text-neutral-400">This month</span>
            </div>
            <div className="inline-flex items-center">
              <span className="w-2.5 h-2.5 inline-block bg-stone-400 rounded-sm me-2 dark:bg-neutral-700"></span>
              <span className="text-[13px] text-stone-600 dark:text-neutral-400">Last month</span>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
            Visitors
          </h2>

          <div className="grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
            <div>
              <h4 className="text-lg text-stone-800 dark:text-neutral-200">
                831,071
                <span className="inline-flex items-center gap-x-1 text-sm text-red-500">
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
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                    <polyline points="16 17 22 17 22 11"></polyline>
                  </svg>
                  18%
                </span>
              </h4>
            </div>

            <div className="md:text-end">
              <p className="text-sm text-stone-500 dark:text-neutral-400">476,001 orders</p>
            </div>
          </div>

          <div id="hs-total-visitors-line-chart" className="min-h-[215px] md:min-h-[265px]"></div>

          <div className="flex justify-center items-center gap-x-4 mt-5">
            <div className="inline-flex items-center">
              <span className="w-2.5 h-2.5 inline-block bg-green-600 rounded-sm me-2"></span>
              <span className="text-[13px] text-stone-600 dark:text-neutral-400">This month</span>
            </div>
            <div className="inline-flex items-center">
              <span className="w-2.5 h-2.5 inline-block bg-stone-400 rounded-sm me-2 dark:bg-neutral-700"></span>
              <span className="text-[13px] text-stone-600 dark:text-neutral-400">Last month</span>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
            Total orders
          </h2>

          <div className="grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
            <div>
              <h4 className="text-lg text-stone-800 dark:text-neutral-200">
                55,935
                <span className="inline-flex items-center gap-x-1 text-sm text-green-500">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.39508 3.55649C9.39508 3.4089 9.45413 3.26735 9.55924 3.16299C9.66436 3.05863 9.80692 3 9.95557 3H14.4395C14.5882 3 14.7307 3.05863 14.8358 3.16299C14.9409 3.26735 15 3.4089 15 3.55649V8.00839C15 8.15598 14.9409 8.29753 14.8358 8.40189C14.7307 8.50625 14.5882 8.56488 14.4395 8.56488C14.2909 8.56488 14.1483 8.50625 14.0432 8.40189C13.9381 8.29753 13.879 8.15598 13.879 8.00839V5.11465L9.8289 10.0307C9.77932 10.0908 9.71762 10.1399 9.64777 10.1749C9.57792 10.2098 9.50146 10.2299 9.42333 10.2338C9.34519 10.2377 9.2671 10.2253 9.19409 10.1974C9.12107 10.1695 9.05474 10.1267 8.99937 10.0719L6.09939 7.19258L2.00107 12.7875C1.91141 12.9007 1.78106 12.975 1.6374 12.9947C1.49374 13.0145 1.34796 12.9782 1.2307 12.8935C1.11343 12.8087 1.03381 12.6822 1.00856 12.5404C0.983313 12.3986 1.01441 12.2526 1.09531 12.1331L5.57925 6.01171C5.62684 5.94662 5.68808 5.89254 5.75875 5.85321C5.82942 5.81388 5.90784 5.79022 5.9886 5.78388C6.06936 5.77753 6.15055 5.78864 6.22657 5.81645C6.30259 5.84425 6.37164 5.88809 6.42895 5.94493L9.3536 8.8498L13.2569 4.11298H9.95557C9.80692 4.11298 9.66436 4.05435 9.55924 3.94998C9.45413 3.84562 9.39508 3.70408 9.39508 3.55649Z"
                    ></path>
                  </svg>
                  4.7%
                </span>
              </h4>
            </div>

            <div className="md:text-end">
              <p className="text-sm text-stone-500 dark:text-neutral-400">78,935 orders</p>
            </div>
          </div>

          <div id="hs-total-orders-line-chart" className="min-h-[215px] md:min-h-[265px]"></div>

          <div className="flex justify-center items-center gap-x-4 mt-5">
            <div className="inline-flex items-center">
              <span className="w-2.5 h-2.5 inline-block bg-green-600 rounded-sm me-2"></span>
              <span className="text-[13px] text-stone-600 dark:text-neutral-400">This month</span>
            </div>
            <div className="inline-flex items-center">
              <span className="w-2.5 h-2.5 inline-block bg-stone-400 rounded-sm me-2 dark:bg-neutral-700"></span>
              <span className="text-[13px] text-stone-600 dark:text-neutral-400">Last month</span>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col bg-white border border-stone-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <h2 className="inline-block font-semibold text-stone-800 dark:text-neutral-200">
            Refunded
          </h2>

          <div className="grid md:grid-cols-2 items-center gap-y-1 md:gap-y-0 md:gap-x-4">
            <div>
              <h4 className="text-lg text-stone-800 dark:text-neutral-200">
                52,441
                <span className="inline-flex items-center gap-x-1 text-sm text-green-500">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.39508 3.55649C9.39508 3.4089 9.45413 3.26735 9.55924 3.16299C9.66436 3.05863 9.80692 3 9.95557 3H14.4395C14.5882 3 14.7307 3.05863 14.8358 3.16299C14.9409 3.26735 15 3.4089 15 3.55649V8.00839C15 8.15598 14.9409 8.29753 14.8358 8.40189C14.7307 8.50625 14.5882 8.56488 14.4395 8.56488C14.2909 8.56488 14.1483 8.50625 14.0432 8.40189C13.9381 8.29753 13.879 8.15598 13.879 8.00839V5.11465L9.8289 10.0307C9.77932 10.0908 9.71762 10.1399 9.64777 10.1749C9.57792 10.2098 9.50146 10.2299 9.42333 10.2338C9.34519 10.2377 9.2671 10.2253 9.19409 10.1974C9.12107 10.1695 9.05474 10.1267 8.99937 10.0719L6.09939 7.19258L2.00107 12.7875C1.91141 12.9007 1.78106 12.975 1.6374 12.9947C1.49374 13.0145 1.34796 12.9782 1.2307 12.8935C1.11343 12.8087 1.03381 12.6822 1.00856 12.5404C0.983313 12.3986 1.01441 12.2526 1.09531 12.1331L5.57925 6.01171C5.62684 5.94662 5.68808 5.89254 5.75875 5.85321C5.82942 5.81388 5.90784 5.79022 5.9886 5.78388C6.06936 5.77753 6.15055 5.78864 6.22657 5.81645C6.30259 5.84425 6.37164 5.88809 6.42895 5.94493L9.3536 8.8498L13.2569 4.11298H9.95557C9.80692 4.11298 9.66436 4.05435 9.55924 3.94998C9.45413 3.84562 9.39508 3.70408 9.39508 3.55649Z"
                    ></path>
                  </svg>
                  11%
                </span>
              </h4>
            </div>

            <div className="md:text-end">
              <p className="text-sm text-stone-500 dark:text-neutral-400">2,289 refunds</p>
            </div>
          </div>

          <div id="hs-total-refunded-line-chart" className="min-h-[215px] md:min-h-[265px]"></div>

          <div className="flex justify-center items-center gap-x-4 mt-5">
            <div className="inline-flex items-center">
              <span className="w-2.5 h-2.5 inline-block bg-green-600 rounded-sm me-2"></span>
              <span className="text-[13px] text-stone-600 dark:text-neutral-400">This month</span>
            </div>
            <div className="inline-flex items-center">
              <span className="w-2.5 h-2.5 inline-block bg-stone-400 rounded-sm me-2 dark:bg-neutral-700"></span>
              <span className="text-[13px] text-stone-600 dark:text-neutral-400">Last month</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
