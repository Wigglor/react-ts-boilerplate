import { CircleDollarSign, Inbox, Settings, Sparkles, Users } from "lucide-react";
import { ReactElement, useEffect, useRef, useState } from "react";
// import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogOut";
import useWorkSpaces from "../../hooks/useWorkSpaces";

type Workspace = {
  name: string;
  id: string;
};

const Navigation = (): ReactElement => {
  // import {
  //   CircleDollarSign,
  //   CircleUserRound,
  //   Inbox,
  //   LogOut,
  //   Menu,
  //   Settings,
  //   Sparkles,
  //   Target,
  //   Users,
  // } from "lucide-react";
  // import { Link, Outlet } from "react-router-dom";
  const logout = useLogout();
  const { workspaceData, updateWorkspaceData } = useWorkSpaces();
  const [stateSelectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setAuth, auth } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const workSpace: string | undefined = workspaceData.selectedWorkSpace?.name;
    setSelectedWorkspace(workSpace);
    // const workSpace: string | undefined = workSpaces.selectedWorkSpace?.name;
    // setSelectedWorkspace(workSpace);
  }, []);
  type WorkSpaces = {
    availableWorkSpaces: {
      name: string;
      id: string;
    }[];
    selectedWorkSpace: {
      name: string;
      id: string;
    };
  };
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
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
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // const selectedWorkSpace_ = workSpaces.availableWorkSpaces.find(
    const selectedWorkSpace_ = workspaceData.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === event.target.value,
    );
    setSelectedWorkspace(event.target.value);
    const newWorkspaceData = { ...workspaceData };
    newWorkspaceData.availableWorkSpaces = workspaceData.availableWorkSpaces;
    newWorkspaceData.selectedWorkSpace = selectedWorkSpace_ as { name: string; id: string };
    updateWorkspaceData(newWorkspaceData);
  };

  const toggleSidenav = () => {
    setIsCollapsed(!isCollapsed);
  };

  const signOut = async () => {
    await logout();
  };

  const sideNavItems = [
    // { icon: <Sparkles width="18" height="18" />, text: "Premium", to: "/premium" },
    {
      icon: <Sparkles width="18" height="18" />,
      text: "Discover",
      to: "/premium",
    },
    {
      icon: <Inbox width="18" height="18" />,
      text: "Inboxes",
      to: "/inboxes",
    },
    {
      icon: <Users width="18" height="18" />,
      text: "People",
      to: "/organization",
    },
    {
      icon: <Settings width="18" height="18" />,
      text: "Account",
      to: "/account",
    },
    {
      icon: <CircleDollarSign width="18" height="18" />,
      text: "Billing",
      to: "/billing",
    },
    // { icon: <Binary />, text: "Payment Status", to: "/paymentstatus" },
    // Add other navigation items as needed
  ];

  return (
    // <>
    //   <main className="relative min-h-full">
    //     <div className="mb-[40px] w-full sm:mb-[64px] bg-gray-50 dark:bg-neutral-950">
    //       <header
    //         className={`
    //         ${isCollapsed ? "w-[calc(100%-24)]" : "w-[calc(100%-48)"}
    //            ml-48 flex flex-wrap md:justify-start md:flex-nowrap z-100 bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transition-all duration-300 `}
    //       >
    //         <div className="p-4 flex justify-between w-full items-center">
    //           <Menu className="ml-2 cursor-pointer" onClick={() => toggleSidenav()} />
    //           <div className="relative" ref={dropdownRef}>
    //             <CircleUserRound
    //               onClick={toggleDropdown}
    //               className="cursor-pointer mr-2 text-slate-700"
    //             />
    //             {isOpen && (
    //               <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-1 z-50">
    //                 <ul className="">
    //                   <li className="px-2 bg-gray-200 text-slate-700">
    //                     <p>signed in as</p>
    //                     <p>
    //                       <b>Testuser</b>
    //                     </p>
    //                   </li>
    //                   <Link to="/organization" className="cursor-pointer" onClick={closeDropdown}>
    //                     <li className="px-3 py-1.5 text-slate-700 hover:bg-gray-100">
    //                       <CircleUserRound width="18" height="18" className="inline" />
    //                       <span className="pl-2 text-slate-700">Organization</span>
    //                     </li>
    //                   </Link>
    //                   <Link to="/account" className="cursor-pointer" onClick={closeDropdown}>
    //                     <li className="px-3 py-1.5 text-slate-700 hover:bg-gray-100 ">
    //                       <Settings width="18" height="18" className="inline" />
    //                       <span className="pl-2 text-slate-700">Account Settings</span>
    //                     </li>
    //                   </Link>
    //                   <Link to="/login" className="cursor-pointer" onClick={signOut}>
    //                     <li className="px-3 py-1.5 text-slate-700 hover:bg-gray-100">
    //                       <LogOut width="18" height="18" className="inline" />
    //                       <span className="pl-2 text-slate-700">Logout</span>
    //                     </li>
    //                   </Link>
    //                 </ul>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </header>

    //       <aside
    //         id="hs-pro-sidebar"
    //         className={`${
    //           isCollapsed ? "w-24" : "w-48"
    //         } hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed inset-y-0 start-0 z-[0] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700 dark:hs-overlay-backdrop-open:bg-neutral-900/90`}
    //       >
    //         <div className="flex flex-col h-full">
    //           <header className="bg-slate-400">
    //             <div className="flex p-4 flex-col justify-center items-center">
    //               <div className="">
    //                 <Link to="/">
    //                   <Target className="text-slate-700" />
    //                 </Link>
    //               </div>
    //             </div>
    //           </header>
    //           <div className="p-4 pt-5">
    //             <ul
    //               className={` text-slate-700 flex flex-col  ${
    //                 isCollapsed ? "items-center" : "items-center"
    //               }`}
    //             >
    //               {sideNavItems.slice(0, 2).map((item, index) => (
    //                 <li key={index} className="">
    //                   <Link
    //                     to={item.to}
    //                     className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    //                   >
    //                     {item.icon}
    //                   </Link>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //           {/* <div className="h-[calc(100%-35px)] lg:h-[calc(100%-93px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"></div> */}

    //           <div className="p-4 pt-5 mt-3 mb-1.5 border-t border-gray-200 first:border-transparent first:pt-0 dark:border-neutral-700 dark:first:border-transparent">
    //             {workspaceData.selectedWorkSpace.id.length > 0 && (
    //               <div>
    //                 <select
    //                   // data-hs-select='{
    //                   //   "placeholder": "Select option...",
    //                   //   "toggleTag": "<button type=\"button\"></button>",
    //                   //   "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-3 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
    //                   //   "dropdownClasses": "mt-2 z-50 w-full max-h-[300px] p-1 space-y-0.5 overflow-hidden overflow-y-auto bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
    //                   //   "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
    //                   //   "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
    //                   // }'
    //                   // className="hidden"
    //                   className="px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    //                   value={stateSelectedWorkspace}
    //                   onChange={handleChange}
    //                 >
    //                   {workspaceData.selectedWorkSpace ? (
    //                     workspaceData.availableWorkSpaces.map((item: Workspace) => (
    //                       <option key={item.id} value={item.name}>
    //                         {item.name}
    //                       </option>
    //                     ))
    //                   ) : (
    //                     <></>
    //                   )}
    //                 </select>
    //               </div>
    //             )}
    //             <ul
    //               className={` text-slate-700 flex flex-col  ${isCollapsed ? "items-center" : ""}`}
    //             >
    //               {sideNavItems.slice(-3).map((item, index) => (
    //                 <li key={index} className="">
    //                   <Link
    //                     to={item.to}
    //                     className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    //                   >
    //                     {item.icon}
    //                     <span className={` w-full ${isCollapsed ? "hidden" : ""}`}>
    //                       {item.text}
    //                     </span>
    //                   </Link>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>

    //           <div className="lg:hidden absolute top-3 -end-3 z-10">
    //             <button
    //               type="button"
    //               className="w-6 h-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
    //               data-hs-overlay="#hs-pro-sidebar"
    //               aria-controls="hs-pro-sidebar"
    //               aria-label="Toggle navigation"
    //             >
    //               <svg
    //                 className="flex-shrink-0 w-4 h-4"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="24"
    //                 height="24"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //               >
    //                 <path d="m15 18-6-6 6-6" />
    //               </svg>
    //             </button>
    //           </div>
    //         </div>
    //       </aside>

    //       <div
    //         className={`transition-all duration-300 ${
    //           isCollapsed
    //             ? " inset-x-24 w-[calc(100%-6rem)] pt-14 lg:ps-[160px]"
    //             : "w-[calc(100%-12rem)] pt-14 lg:ps-[260px]"
    //         }`}
    //       >
    //         <Outlet />
    //       </div>
    //     </div>
    //   </main>
    // </>

    // <>
    //   <div className="relative min-h-full">
    //     <aside
    //       id="hs-pro-sidebar"
    //       className={`${
    //         isCollapsed ? "w-24" : "w-48"
    //       } hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed inset-y-0 start-0 z-[0] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700 dark:hs-overlay-backdrop-open:bg-neutral-900/90`}
    //     >
    //       <div className="flex flex-col h-full">
    //         <header className="bg-slate-400">
    //           <div className="flex p-4 flex-col justify-center items-center">
    //             <div className="">
    //               <Link to="/">
    //                 <Target className="text-slate-700" />
    //               </Link>
    //             </div>
    //           </div>
    //         </header>
    //         <div className="p-4 pt-5">
    //           <ul
    //             className={` text-slate-700 flex flex-col  ${
    //               isCollapsed ? "items-center" : "items-center"
    //             }`}
    //           >
    //             {sideNavItems.slice(0, 2).map((item, index) => (
    //               <li key={index} className="">
    //                 <Link
    //                   to={item.to}
    //                   className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    //                 >
    //                   {item.icon}
    //                 </Link>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //         {/* <div className="h-[calc(100%-35px)] lg:h-[calc(100%-93px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"></div> */}

    //         <div className="p-4 pt-5 mt-3 mb-1.5 border-t border-gray-200 first:border-transparent first:pt-0 dark:border-neutral-700 dark:first:border-transparent">
    //           {workspaceData.selectedWorkSpace.id.length > 0 && (
    //             <div>
    //               <select
    //                 // data-hs-select='{
    //                 //   "placeholder": "Select option...",
    //                 //   "toggleTag": "<button type=\"button\"></button>",
    //                 //   "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-3 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
    //                 //   "dropdownClasses": "mt-2 z-50 w-full max-h-[300px] p-1 space-y-0.5 overflow-hidden overflow-y-auto bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
    //                 //   "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
    //                 //   "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
    //                 // }'
    //                 // className="hidden"
    //                 className="px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    //                 value={stateSelectedWorkspace}
    //                 onChange={handleChange}
    //               >
    //                 {workspaceData.selectedWorkSpace ? (
    //                   workspaceData.availableWorkSpaces.map((item: Workspace) => (
    //                     <option key={item.id} value={item.name}>
    //                       {item.name}
    //                     </option>
    //                   ))
    //                 ) : (
    //                   <></>
    //                 )}
    //               </select>
    //             </div>
    //           )}
    //           <ul className={` text-slate-700 flex flex-col  ${isCollapsed ? "items-center" : ""}`}>
    //             {sideNavItems.slice(-3).map((item, index) => (
    //               <li key={index} className="">
    //                 <Link
    //                   to={item.to}
    //                   className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    //                 >
    //                   {item.icon}
    //                   <span className={` w-full ${isCollapsed ? "hidden" : ""}`}>{item.text}</span>
    //                 </Link>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>

    //         <div className="lg:hidden absolute top-3 -end-3 z-10">
    //           <button
    //             type="button"
    //             className="w-6 h-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
    //             data-hs-overlay="#hs-pro-sidebar"
    //             aria-controls="hs-pro-sidebar"
    //             aria-label="Toggle navigation"
    //           >
    //             <svg
    //               className="flex-shrink-0 w-4 h-4"
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="24"
    //               height="24"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               stroke="currentColor"
    //               strokeWidth="2"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             >
    //               <path d="m15 18-6-6 6-6" />
    //             </svg>
    //           </button>
    //         </div>
    //       </div>
    //     </aside>
    //     <div className="flex-1 flex flex-col">
    //       <header
    //         className={`
    //            ml-48 flex flex-wrap md:justify-start md:flex-nowrap z-100 bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transition-all duration-300 `}
    //       >
    //         {/* <header
    //         className={`
    //         ${isCollapsed ? "w-[calc(100%-24)]" : "w-[calc(100%-48)"}
    //            ml-48 flex flex-wrap md:justify-start md:flex-nowrap z-100 bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transition-all duration-300 `}
    //       > */}
    //         <div className="p-4 flex justify-between w-full items-center">
    //           <Menu className="ml-2 cursor-pointer" onClick={() => toggleSidenav()} />
    //           <div className="relative" ref={dropdownRef}>
    //             <CircleUserRound
    //               onClick={toggleDropdown}
    //               className="cursor-pointer mr-2 text-slate-700"
    //             />
    //             {isOpen && (
    //               <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-1 z-50">
    //                 <ul className="">
    //                   <li className="px-2 bg-gray-200 text-slate-700">
    //                     <p>signed in as</p>
    //                     <p>
    //                       <b>Testuser</b>
    //                     </p>
    //                   </li>
    //                   <Link to="/organization" className="cursor-pointer" onClick={closeDropdown}>
    //                     <li className="px-3 py-1.5 text-slate-700 hover:bg-gray-100">
    //                       <CircleUserRound width="18" height="18" className="inline" />
    //                       <span className="pl-2 text-slate-700">Organization</span>
    //                     </li>
    //                   </Link>
    //                   <Link to="/account" className="cursor-pointer" onClick={closeDropdown}>
    //                     <li className="px-3 py-1.5 text-slate-700 hover:bg-gray-100 ">
    //                       <Settings width="18" height="18" className="inline" />
    //                       <span className="pl-2 text-slate-700">Account Settings</span>
    //                     </li>
    //                   </Link>
    //                   <Link to="/login" className="cursor-pointer" onClick={signOut}>
    //                     <li className="px-3 py-1.5 text-slate-700 hover:bg-gray-100">
    //                       <LogOut width="18" height="18" className="inline" />
    //                       <span className="pl-2 text-slate-700">Logout</span>
    //                     </li>
    //                   </Link>
    //                 </ul>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       </header>

    //       <main
    //         className={`transition-all duration-300 ${
    //           isCollapsed
    //             ? " inset-x-24 w-[calc(100%-6rem)] pt-14 lg:ps-[160px]"
    //             : "w-[calc(100%-12rem)] pt-14 lg:ps-[260px]"
    //         }`}
    //       >
    //         <Outlet />
    //       </main>
    //     </div>
    //   </div>
    // </>

    // <main className="flex h-screen">
    //   <aside
    //     className={`bg-gray-800 text-white transition-width duration-300 ${
    //       isCollapsed ? "w-16" : "w-64"
    //     }`}
    //   >
    //     {/* Sidebar content */}
    //     <button className="m-2 bg-gray-700 p-2" onClick={() => setIsCollapsed(!isCollapsed)}>
    //       Toggle
    //     </button>
    //     {/* Additional sidebar content */}
    //   </aside>
    //   <div className="flex-1 flex flex-col">
    //     <header
    //       className={`bg-gray-200 flex justify-between p-4 ${
    //         isCollapsed ? "" : ""
    //       } transition-margin duration-300`}
    //     >
    //       {/* Header content */}
    //       <span>Header</span>
    //       <span>Account</span>
    //     </header>
    //     <main className="flex-1 p-4">
    //       <Outlet />
    //     </main>
    //   </div>
    // </main>
    <>
      <body className="bg-gray-50 dark:bg-neutral-950">
        <header className="lg:ms-[260px] fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div
            className="flex justify-between xl:grid xl:grid-cols-3 basis-full items-center w-full py-2.5 px-2 sm:px-5"
            aria-label="Global"
          >
            <div className="xl:col-span-1 flex items-center md:gap-x-3">
              <div className="lg:hidden">
                <button
                  type="button"
                  className="w-7 h-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-sidebar"
                  aria-controls="hs-pro-sidebar"
                  aria-label="Toggle navigation"
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              <div className="hidden lg:block xl:w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-white/60"
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
                    type="text"
                    className="py-2 ps-10 pe-16 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-200 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
                    placeholder="Search or type a command"
                    data-hs-overlay="#hs-pro-dnsm"
                  ></input>
                  <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
                    <svg
                      className="flex-shrink-0 w-3 h-3 text-gray-400 dark:text-white/60"
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
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    <span className="mx-1">
                      <svg
                        className="flex-shrink-0 w-3 h-3 text-gray-400 dark:text-white/60"
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
                    </span>
                    <span className="text-xs">/</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-2 flex justify-end items-center gap-x-2">
              <div className="flex items-center">
                <div className="lg:hidden">
                  <button
                    type="button"
                    className="inline-flex flex-shrink-0 justify-center items-center gap-x-2 h-[38px] w-[38px] rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    data-hs-overlay="#hs-pro-dnsm"
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
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>

                <div className="hs-dropdown relative inline-flex [--placement:top-right]">
                  <div className="hs-tooltip inline-block [--placement:bottom]">
                    <button
                      id="hs-pro-dnhd"
                      type="button"
                      className="hs-tooltip-toggle w-[38px] h-[38px] inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                      </svg>
                    </button>
                    <span
                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                      role="tooltip"
                    >
                      Help and Support
                    </span>
                  </div>

                  <div
                    className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                    aria-labelledby="hs-pro-dnhd"
                  >
                    <div className="p-1">
                      <a
                        className="flex gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 mt-1 w-4 h-4"
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
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <path d="M12 17h.01" />
                        </svg>
                        Help Centre
                      </a>
                      <a
                        className="flex gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 mt-1 w-4 h-4"
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
                        Community
                      </a>
                      <a
                        className="flex gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 mt-1 w-4 h-4"
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
                          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                        </svg>
                        What’s New
                      </a>

                      <div className="my-1 border-t border-gray-200 dark:border-neutral-800"></div>

                      <a
                        className="flex gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 mt-1 w-4 h-4"
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
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                        Privacy and Legal
                      </a>
                      <a
                        className="flex gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 mt-1 w-4 h-4"
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
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        Documentation
                      </a>
                      <a
                        className="flex gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 mt-1 w-4 h-4"
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
                          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        Hire an Expert
                        <div className="ms-auto">
                          <span className="inline-flex items-center gap-1.5 py-px px-1.5 rounded text-[10px] leading-4 font-medium bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300">
                            New
                          </span>
                        </div>
                      </a>

                      <div className="my-1 border-t border-gray-200 dark:border-neutral-800"></div>

                      <a
                        className="flex gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 mt-1 w-4 h-4"
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
                      </a>
                      <div className="hs-dropdown relative [--strategy:static] md:[--strategy:absolute] [--adaptive:none] md:[--trigger:hover]">
                        <button
                          type="button"
                          className="hs-dropdown-toggle w-full flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                          Contact Us
                          <svg
                            className="rotate-90 md:rotate-0 ms-auto w-3 h-3"
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

                        <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 md:w-48 hidden z-10 top-0 end-full md:!me-3 md:mt-1 md:p-1 bg-white md:shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] md:rounded-lg before:absolute before:-end-5 before:top-0 before:h-full before:w-5 dark:bg-neutral-900 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]">
                          <a
                            className="flex gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            href="#"
                          >
                            <svg
                              className="flex-shrink-0 mt-1 w-4 h-4"
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
                              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                            </svg>
                            Contact Support
                          </a>
                          <a
                            className="flex gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                            href="#"
                          >
                            <svg
                              className="flex-shrink-0 mt-1 w-4 h-4"
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
                              <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                            </svg>
                            Contact Sales
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hs-dropdown relative inline-flex [--auto-close:inside]">
                  <div className="hs-tooltip inline-block [--placement:bottom]">
                    <button
                      id="hs-pro-dnnd"
                      type="button"
                      className="hs-tooltip-toggle relative w-[38px] h-[38px] inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      <span className="flex absolute top-0 end-0 -mt-1.5 -me-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 dark:bg-red-600"></span>
                        <span className="relative min-w-[18px] min-h-[18px] inline-flex justify-center items-center text-[10px] bg-red-500 text-white rounded-full px-1">
                          2
                        </span>
                      </span>
                    </button>
                    <span
                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                      role="tooltip"
                    >
                      Notifications
                    </span>
                  </div>

                  <div
                    className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-full sm:w-96 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white border-t border-gray-200 sm:border-t-0 sm:rounded-lg shadow-md sm:shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                    aria-labelledby="hs-pro-dnnd"
                  >
                    <div className="px-5 pt-3 flex justify-between items-center border-b border-gray-200 dark:border-neutral-800">
                      <nav className="flex space-x-1" aria-label="Tabs" role="tablist">
                        <button
                          type="button"
                          className="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex items-center gap-x-2 hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 after:absolute after:-bottom-2 after:inset-x-2.5 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 active"
                          id="hs-pro-tabs-dnn-item-all"
                          data-hs-tab="#hs-pro-tabs-dnn-all"
                          aria-controls="hs-pro-tabs-dnn-all"
                          role="tab"
                        >
                          All
                        </button>
                        <button
                          type="button"
                          className="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex items-center gap-x-2 hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 after:absolute after:-bottom-2 after:inset-x-2.5 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          id="hs-pro-tabs-dnn-item-archived"
                          data-hs-tab="#hs-pro-tabs-dnn-archived"
                          aria-controls="hs-pro-tabs-dnn-archived"
                          role="tab"
                        >
                          Archived
                        </button>
                      </nav>

                      <div className="hs-tooltip relative inline-block mb-3">
                        <a
                          className="hs-tooltip-toggle w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          href="#"
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
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </a>
                        <span
                          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                          role="tooltip"
                        >
                          Preferences
                        </span>
                      </div>
                    </div>

                    <div className="h-[480px] overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                      <div
                        id="hs-pro-tabs-dnn-all"
                        role="tabpanel"
                        aria-labelledby="hs-pro-tabs-dnn-item-all"
                      >
                        <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
                          <li className="relative group w-full flex gap-x-5 text-start p-5 bg-gray-100 dark:bg-neutral-800">
                            <div className="relative flex-shrink-0">
                              <img
                                className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                                src="https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                                alt="Image Description"
                              ></img>
                              <span className="absolute top-4 -start-3 w-2 h-2 bg-blue-600 rounded-full dark:bg-blue-500"></span>
                            </div>
                            <div className="grow">
                              <p className="text-xs text-gray-500 dark:text-neutral-500">
                                2 hours ago
                              </p>
                              <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                                Eilis Warner
                              </span>
                              <p className="text-sm text-gray-500 dark:text-neutral-500">
                                changed an issue from “in Progress” to “Review”
                              </p>
                            </div>

                            <div>
                              <div className="sm:group-hover:opacity-100 sm:opacity-0 p-0.5 sm:absolute sm:top-5 sm:end-5 bg-white border border-gray-200 rounded-lg shadow-sm transition ease-out dark:bg-neutral-800 dark:border-neutral-700">
                                <div className="flex items-center">
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                      </svg>
                                      <svg
                                        className="flex-shrink-0 w-4 h-4 hidden"
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
                                        <rect width="18" height="18" x="3" y="3" rx="2" />
                                        <path d="M8 12h8" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Mark this notification as read
                                    </span>
                                  </div>
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <rect width="20" height="5" x="2" y="4" rx="2" />
                                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                                        <path d="M10 13h4" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Archive this notification
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li className="relative group w-full flex gap-x-5 text-start p-5">
                            <div className="relative flex-shrink-0">
                              <span className="flex flex-shrink-0 justify-center items-center w-[38px] h-[38px] bg-white border border-gray-200 text-gray-500 text-sm font-semibold rounded-full shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                                CB
                              </span>
                            </div>
                            <div className="grow">
                              <p className="text-xs text-gray-500 dark:text-neutral-500">
                                3 days ago
                              </p>
                              <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                                Clara Becker
                              </span>
                              <p className="text-sm text-gray-500 dark:text-neutral-500">
                                mentioned you in a comment
                              </p>
                              <div className="mt-2">
                                <blockquote className="ps-3 border-s-4 border-gray-200 text-sm text-gray-500 dark:border-neutral-700 dark:text-neutral-400">
                                  Nice work, love! You really nailed it. Keep it up!
                                </blockquote>
                              </div>
                            </div>

                            <div>
                              <div className="sm:group-hover:opacity-100 sm:opacity-0 p-0.5 sm:absolute sm:top-5 sm:end-5 bg-white border border-gray-200 rounded-lg shadow-sm transition ease-out dark:bg-neutral-800 dark:border-neutral-700">
                                <div className="flex items-center">
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                      </svg>
                                      <svg
                                        className="flex-shrink-0 w-4 h-4 hidden"
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
                                        <rect width="18" height="18" x="3" y="3" rx="2" />
                                        <path d="M8 12h8" />
                                      </svg>
                                      <svg
                                        className="w-4 h-4 hidden"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                                        <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Mark this notification as read
                                    </span>
                                  </div>
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <rect width="20" height="5" x="2" y="4" rx="2" />
                                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                                        <path d="M10 13h4" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Archive this notification
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li className="relative group w-full flex gap-x-5 text-start p-5">
                            <div className="relative flex-shrink-0">
                              <svg
                                className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect width="32" height="32" rx="6" fill="#2563EB" />
                                <path
                                  d="M6 26.4167V15.5833C6 10.0605 10.4772 5.58333 16 5.58333C21.5228 5.58333 26 10.0605 26 15.5833C26 21.1062 21.5228 25.5833 16 25.5833H15.1667"
                                  stroke="white"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M9.33328 26.4168V15.7168C9.33328 11.9612 12.3181 8.91678 15.9999 8.91678C19.6818 8.91678 22.6666 11.9612 22.6666 15.7168C22.6666 19.4723 19.6818 22.5168 15.9999 22.5168H15.1666"
                                  stroke="white"
                                  strokeWidth="1.5"
                                />
                                <circle cx="15.9999" cy="15.6011" r="4.16667" fill="white" />
                              </svg>
                            </div>
                            <div className="grow">
                              <p className="text-xs text-gray-500 dark:text-neutral-500">
                                5 Jan 2023
                              </p>
                              <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                                New Update on Preline
                              </span>
                              <p className="text-sm text-gray-500 dark:text-neutral-500">
                                Add yourself to our new “Hire Page”. Let visitors know you’re open
                                to freelance or full-time work.
                              </p>
                              <a
                                className="mt-2 p-1.5 inline-flex items-center border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-sm focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                href="#"
                              >
                                <img
                                  className="w-[70px] h-[62px] object-cover rounded-lg"
                                  src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                                  alt="Image Description"
                                ></img>
                                <div className="grow py-2.5 px-4">
                                  <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">
                                    Get hired!
                                  </p>
                                  <p className="inline-flex items-center gap-x-1 text-sm text-gray-500 dark:text-neutral-500">
                                    Get started
                                    <svg
                                      className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1"
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
                                      <path d="m9 18 6-6-6-6" />
                                    </svg>
                                  </p>
                                </div>
                              </a>
                            </div>

                            <div>
                              <div className="sm:group-hover:opacity-100 sm:opacity-0 p-0.5 sm:absolute sm:top-5 sm:end-5 bg-white border border-gray-200 rounded-lg shadow-sm transition ease-out dark:bg-neutral-800 dark:border-neutral-700">
                                <div className="flex items-center">
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                      </svg>
                                      <svg
                                        className="flex-shrink-0 w-4 h-4 hidden"
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
                                        <rect width="18" height="18" x="3" y="3" rx="2" />
                                        <path d="M8 12h8" />
                                      </svg>
                                      <svg
                                        className="w-4 h-4 hidden"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                                        <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Mark this notification as read
                                    </span>
                                  </div>
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <rect width="20" height="5" x="2" y="4" rx="2" />
                                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                                        <path d="M10 13h4" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Archive this notification
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li className="relative group w-full flex gap-x-5 text-start p-5">
                            <div className="relative flex-shrink-0">
                              <svg
                                className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect width="32" height="32" rx="6" fill="#2563EB" />
                                <path
                                  d="M6 26.4167V15.5833C6 10.0605 10.4772 5.58333 16 5.58333C21.5228 5.58333 26 10.0605 26 15.5833C26 21.1062 21.5228 25.5833 16 25.5833H15.1667"
                                  stroke="white"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M9.33328 26.4168V15.7168C9.33328 11.9612 12.3181 8.91678 15.9999 8.91678C19.6818 8.91678 22.6666 11.9612 22.6666 15.7168C22.6666 19.4723 19.6818 22.5168 15.9999 22.5168H15.1666"
                                  stroke="white"
                                  strokeWidth="1.5"
                                />
                                <circle cx="15.9999" cy="15.6011" r="4.16667" fill="white" />
                              </svg>
                            </div>
                            <div className="grow">
                              <p className="text-xs text-gray-500 dark:text-neutral-500">
                                5 Jan 2023
                              </p>
                              <p className="text-sm text-gray-800 dark:text-neutral-400">
                                We’re updating our Privacy Policy as of 10th January 2023
                              </p>
                              <p>
                                <a
                                  className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
                                  href="#"
                                >
                                  Learn more
                                  <svg
                                    className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1"
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
                                    <path d="m9 18 6-6-6-6" />
                                  </svg>
                                </a>
                              </p>
                            </div>

                            <div>
                              <div className="sm:group-hover:opacity-100 sm:opacity-0 p-0.5 sm:absolute sm:top-5 sm:end-5 bg-white border border-gray-200 rounded-lg shadow-sm transition ease-out dark:bg-neutral-800 dark:border-neutral-700">
                                <div className="flex items-center">
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                      </svg>
                                      <svg
                                        className="flex-shrink-0 w-4 h-4 hidden"
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
                                        <rect width="18" height="18" x="3" y="3" rx="2" />
                                        <path d="M8 12h8" />
                                      </svg>
                                      <svg
                                        className="w-4 h-4 hidden"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                                        <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Mark this notification as read
                                    </span>
                                  </div>
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <rect width="20" height="5" x="2" y="4" rx="2" />
                                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                                        <path d="M10 13h4" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Archive this notification
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li className="relative group w-full flex gap-x-5 text-start p-5 bg-gray-100 dark:bg-neutral-800">
                            <div className="relative flex-shrink-0">
                              <img
                                className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                                src="https://images.unsplash.com/photo-1614880353165-e56fac2ea9a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                                alt="Image Description"
                              ></img>
                              <span className="absolute top-4 -start-3 w-2 h-2 bg-blue-600 rounded-full dark:bg-blue-500"></span>
                            </div>
                            <div className="grow">
                              <p className="text-xs text-gray-500 dark:text-neutral-500">
                                31 Dec 2022
                              </p>
                              <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                                Rubia Walter
                              </span>
                              <p className="text-sm text-gray-500 dark:text-neutral-500">
                                Joined the Slack group HS Team
                              </p>
                            </div>

                            <div>
                              <div className="sm:group-hover:opacity-100 sm:opacity-0 p-0.5 sm:absolute sm:top-5 sm:end-5 bg-white border border-gray-200 rounded-lg shadow-sm transition ease-out dark:bg-neutral-800 dark:border-neutral-700">
                                <div className="flex items-center">
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <polyline points="9 11 12 14 22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                      </svg>
                                      <svg
                                        className="flex-shrink-0 w-4 h-4 hidden"
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
                                        <rect width="18" height="18" x="3" y="3" rx="2" />
                                        <path d="M8 12h8" />
                                      </svg>
                                      <svg
                                        className="w-4 h-4 hidden"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                                        <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Mark this notification as read
                                    </span>
                                  </div>
                                  <div className="hs-tooltip relative inline-block">
                                    <button
                                      type="button"
                                      className="hs-tooltip-toggle w-7 h-7 flex flex-shrink-0 justify-center items-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                                        <rect width="20" height="5" x="2" y="4" rx="2" />
                                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                                        <path d="M10 13h4" />
                                      </svg>
                                    </button>
                                    <span
                                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                                      role="tooltip"
                                    >
                                      Archive this notification
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div
                        id="hs-pro-tabs-dnn-archived"
                        className="hidden"
                        role="tabpanel"
                        aria-labelledby="hs-pro-tabs-dnn-item-archived"
                      >
                        <div className="h-[480px] flex flex-col justify-center text-center p-5">
                          <svg
                            className="w-full"
                            width="178"
                            height="138"
                            viewBox="0 0 178 138"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g filter="url(#filter0_d_499_322852)">
                              <rect
                                x="12"
                                y="6"
                                width="154"
                                height="40"
                                rx="8"
                                className="fill-white dark:fill-neutral-800"
                                fill="currentColor"
                                shapeRendering="crispEdges"
                              />
                              <rect
                                x="20"
                                y="14"
                                width="24"
                                height="24"
                                rx="4"
                                className="fill-gray-200 dark:fill-neutral-700"
                                fill="currentColor"
                              />
                              <g clipPath="url(#clip0_499_322852)">
                                <path
                                  d="M32 32C32.3978 32 32.7794 31.8419 33.0607 31.5606C33.342 31.2793 33.5 30.8978 33.5 30.5H30.5C30.5 30.8978 30.658 31.2793 30.9393 31.5606C31.2206 31.8419 31.6022 32 32 32ZM32 21.4385L31.4023 21.5592C30.7242 21.6974 30.1147 22.0656 29.677 22.6015C29.2392 23.1373 29.0001 23.808 29 24.5C29 24.971 28.8995 26.1477 28.6557 27.3065C28.5357 27.8817 28.3738 28.481 28.1585 29H35.8415C35.6262 28.481 35.465 27.8825 35.3442 27.3065C35.1005 26.1477 35 24.971 35 24.5C34.9998 23.8082 34.7605 23.1376 34.3228 22.6019C33.885 22.0662 33.2757 21.6981 32.5977 21.56L32 21.4377V21.4385ZM36.665 29C36.8323 29.3352 37.0258 29.6007 37.25 29.75H26.75C26.9742 29.6007 27.1677 29.3352 27.335 29C28.01 27.65 28.25 25.16 28.25 24.5C28.25 22.685 29.54 21.17 31.2538 20.8242C31.2433 20.72 31.2548 20.6146 31.2875 20.5151C31.3203 20.4155 31.3735 20.3239 31.4438 20.2462C31.5141 20.1685 31.6 20.1063 31.6957 20.0638C31.7915 20.0213 31.8952 19.9993 32 19.9993C32.1048 19.9993 32.2085 20.0213 32.3043 20.0638C32.4 20.1063 32.4859 20.1685 32.5562 20.2462C32.6265 20.3239 32.6797 20.4155 32.7125 20.5151C32.7452 20.6146 32.7567 20.72 32.7462 20.8242C33.594 20.9967 34.356 21.4568 34.9034 22.1266C35.4508 22.7965 35.7499 23.6349 35.75 24.5C35.75 25.16 35.99 27.65 36.665 29Z"
                                  className="fill-gray-600 dark:fill-neutral-400"
                                  fill="currentColor"
                                />
                              </g>
                              <rect
                                x="52"
                                y="17"
                                width="60"
                                height="6"
                                rx="3"
                                className="fill-gray-200 dark:fill-neutral-600"
                                fill="currentColor"
                              />
                              <rect
                                x="52"
                                y="29"
                                width="106"
                                height="6"
                                rx="3"
                                className="fill-gray-200 dark:fill-neutral-600"
                                fill="currentColor"
                              />
                              <rect
                                x="12.5"
                                y="6.5"
                                width="153"
                                height="39"
                                rx="7.5"
                                className="stroke-gray-200 dark:stroke-neutral-700"
                                stroke="currentColor"
                                shapeRendering="crispEdges"
                              />
                            </g>
                            <rect
                              x="12.5"
                              y="52.5"
                              width="153"
                              height="39"
                              rx="7.5"
                              className="fill-white dark:fill-neutral-800"
                              fill="currentColor"
                            />
                            <rect
                              x="20"
                              y="60"
                              width="24"
                              height="24"
                              rx="4"
                              className="fill-gray-100 dark:fill-neutral-700"
                              fill="currentColor"
                            />
                            <g clipPath="url(#clip1_499_322852)">
                              <path
                                d="M32 78C32.3978 78 32.7794 77.8419 33.0607 77.5606C33.342 77.2793 33.5 76.8978 33.5 76.5H30.5C30.5 76.8978 30.658 77.2793 30.9393 77.5606C31.2206 77.8419 31.6022 78 32 78ZM32 67.4385L31.4023 67.5592C30.7242 67.6974 30.1147 68.0656 29.677 68.6015C29.2392 69.1373 29.0001 69.808 29 70.5C29 70.971 28.8995 72.1477 28.6557 73.3065C28.5357 73.8817 28.3738 74.481 28.1585 75H35.8415C35.6262 74.481 35.465 73.8825 35.3442 73.3065C35.1005 72.1477 35 70.971 35 70.5C34.9998 69.8082 34.7605 69.1376 34.3228 68.6019C33.885 68.0662 33.2757 67.6981 32.5977 67.56L32 67.4377V67.4385ZM36.665 75C36.8323 75.3352 37.0258 75.6007 37.25 75.75H26.75C26.9742 75.6007 27.1677 75.3352 27.335 75C28.01 73.65 28.25 71.16 28.25 70.5C28.25 68.685 29.54 67.17 31.2538 66.8242C31.2433 66.72 31.2548 66.6146 31.2875 66.5151C31.3203 66.4155 31.3735 66.3239 31.4438 66.2462C31.5141 66.1685 31.6 66.1063 31.6957 66.0638C31.7915 66.0213 31.8952 65.9993 32 65.9993C32.1048 65.9993 32.2085 66.0213 32.3043 66.0638C32.4 66.1063 32.4859 66.1685 32.5562 66.2462C32.6265 66.3239 32.6797 66.4155 32.7125 66.5151C32.7452 66.6146 32.7567 66.72 32.7462 66.8242C33.594 66.9967 34.356 67.4568 34.9034 68.1266C35.4508 68.7965 35.7499 69.6349 35.75 70.5C35.75 71.16 35.99 73.65 36.665 75Z"
                                className="fill-gray-500 dark:fill-neutral-500"
                                fill="currentColor"
                              />
                            </g>
                            <rect
                              x="52"
                              y="63"
                              width="60"
                              height="6"
                              rx="3"
                              className="fill-gray-200 dark:fill-neutral-700"
                              fill="currentColor"
                            />
                            <rect
                              x="52"
                              y="75"
                              width="106"
                              height="6"
                              rx="3"
                              className="fill-gray-200 dark:fill-neutral-700"
                              fill="currentColor"
                            />
                            <rect
                              x="12.5"
                              y="52.5"
                              width="153"
                              height="39"
                              rx="7.5"
                              className="stroke-gray-200 dark:stroke-neutral-700"
                              stroke="currentColor"
                            />
                            <rect
                              x="12.5"
                              y="98.5"
                              width="153"
                              height="39"
                              rx="7.5"
                              className="fill-white dark:fill-neutral-800"
                              fill="currentColor"
                            />
                            <rect
                              x="20"
                              y="106"
                              width="24"
                              height="24"
                              rx="4"
                              className="fill-gray-50 dark:fill-neutral-700/50"
                            />
                            <g clipPath="url(#clip2_499_322852)">
                              <path
                                d="M32 124C32.3978 124 32.7794 123.842 33.0607 123.561C33.342 123.279 33.5 122.898 33.5 122.5H30.5C30.5 122.898 30.658 123.279 30.9393 123.561C31.2206 123.842 31.6022 124 32 124ZM32 113.439L31.4023 113.559C30.7242 113.697 30.1147 114.066 29.677 114.602C29.2392 115.137 29.0001 115.808 29 116.5C29 116.971 28.8995 118.148 28.6557 119.307C28.5357 119.882 28.3738 120.481 28.1585 121H35.8415C35.6262 120.481 35.465 119.883 35.3442 119.307C35.1005 118.148 35 116.971 35 116.5C34.9998 115.808 34.7605 115.138 34.3228 114.602C33.885 114.066 33.2757 113.698 32.5977 113.56L32 113.438V113.439ZM36.665 121C36.8323 121.335 37.0258 121.601 37.25 121.75H26.75C26.9742 121.601 27.1677 121.335 27.335 121C28.01 119.65 28.25 117.16 28.25 116.5C28.25 114.685 29.54 113.17 31.2538 112.824C31.2433 112.72 31.2548 112.615 31.2875 112.515C31.3203 112.416 31.3735 112.324 31.4438 112.246C31.5141 112.169 31.6 112.106 31.6957 112.064C31.7915 112.021 31.8952 111.999 32 111.999C32.1048 111.999 32.2085 112.021 32.3043 112.064C32.4 112.106 32.4859 112.169 32.5562 112.246C32.6265 112.324 32.6797 112.416 32.7125 112.515C32.7452 112.615 32.7567 112.72 32.7462 112.824C33.594 112.997 34.356 113.457 34.9034 114.127C35.4508 114.797 35.7499 115.635 35.75 116.5C35.75 117.16 35.99 119.65 36.665 121Z"
                                className="fill-gray-300 dark:fill-neutral-600"
                                fill="currentColor"
                              />
                            </g>
                            <rect
                              x="52"
                              y="109"
                              width="60"
                              height="6"
                              rx="3"
                              className="fill-gray-100 dark:fill-neutral-700/50"
                            />
                            <rect
                              x="52"
                              y="121"
                              width="106"
                              height="6"
                              rx="3"
                              className="fill-gray-100 dark:fill-neutral-700/50"
                            />
                            <rect
                              x="12.5"
                              y="98.5"
                              width="153"
                              height="39"
                              rx="7.5"
                              className="stroke-gray-100 dark:stroke-neutral-700/50"
                              stroke="currentColor"
                            />
                            <defs>
                              <filter
                                id="filter0_d_499_322852"
                                x="0"
                                y="0"
                                width="178"
                                height="64"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                              >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy="6" />
                                <feGaussianBlur stdDeviation="6" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_499_322852"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_499_322852"
                                  result="shape"
                                />
                              </filter>
                              <clipPath id="clip0_499_322852">
                                <rect
                                  width="12"
                                  height="12"
                                  className="fill-white dark:fill-neutral-800"
                                  fill="currentColor"
                                  transform="translate(26 20)"
                                />
                              </clipPath>
                              <clipPath id="clip1_499_322852">
                                <rect
                                  width="12"
                                  height="12"
                                  className="fill-white dark:fill-neutral-800"
                                  fill="currentColor"
                                  transform="translate(26 66)"
                                />
                              </clipPath>
                              <clipPath id="clip2_499_322852">
                                <rect
                                  width="12"
                                  height="12"
                                  className="fill-white dark:fill-neutral-800"
                                  fill="currentColor"
                                  transform="translate(26 112)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p className="mt-5 font-semibold text-gray-800 dark:text-neutral-300"></p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                            y you about important updates ann Preline.
                          </p>
                          <div className="mt-3">
                            <a
                              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                              href="#"
                            >
                              Notifications settings
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center border-t border-gray-200 dark:border-neutral-800">
                      <a
                        className="p-4 flex justify-center items-center gap-x-2 text-sm text-gray-500 font-medium sm:rounded-b-lg hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
                        href="#"
                      >
                        Mark all as read
                      </a>
                    </div>
                  </div>
                </div>

                <div className="hs-tooltip inline-block [--placement:bottom]">
                  <button
                    type="button"
                    className="hs-tooltip-toggle w-[38px] h-[38px] inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    data-hs-overlay="#hs-pro-dnam"
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
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </button>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                    role="tooltip"
                  >
                    Activity
                  </span>
                </div>
              </div>

              <div className="hs-dropdown relative inline-flex [--auto-close:inside]">
                <button
                  id="hs-pro-dnshd"
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  Share
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-full sm:w-[460px] transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white border-t border-gray-200 sm:border-t-0 sm:rounded-lg shadow-md sm:shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-dnshd"
                >
                  <div className="p-5 border-b border-gray-200 dark:border-neutral-800">
                    <span className="block text-xs font-medium text-gray-800 mb-2 dark:text-neutral-300">
                      Invite
                    </span>

                    <div className="flex items-center gap-x-2">
                      <div className="relative w-full">
                        <input
                          type="text"
                          className="py-2 px-3 pe-24 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-600"
                          placeholder="Add name or emails"
                        ></input>
                        <div className="absolute inset-y-0 end-0 flex items-center z-20 pe-[5px] text-gray-400">
                          <div className="relative">
                            <select
                              data-hs-select='{
                          "placeholder": "Select option...",
                          "toggleTag": "<button type=\"button\"></button>",
                          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 ps-2.5 pe-6 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 text-xs text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                          "dropdownClasses": "end-0 mt-2 z-50 w-28 p-1 space-y-0.5 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950",
                          "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-1.5 px-2 w-full text-xs text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                          "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                        }'
                              className="hidden"
                            >
                              <option value="">Choose</option>
                              <option selected>Can view</option>
                              <option>Can edit</option>
                              <option>Admin</option>
                            </select>

                            <div className="absolute top-1/2 end-1.5 -translate-y-1/2">
                              <svg
                                className="flex-shrink-0 w-3.5 h-3.5 text-gray-600 dark:text-neutral-400"
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
                        </div>
                      </div>

                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Send
                      </button>
                    </div>

                    <div className="flex mt-2">
                      <input
                        type="checkbox"
                        className="shrink-0 w-3.5 h-3.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-pro-dnshdnch"
                        checked
                      ></input>
                      <label
                        htmlFor="hs-pro-dnshdnch"
                        className="text-xs text-gray-600 ms-1.5 dark:text-neutral-400"
                      >
                        Notify recipients via email
                      </label>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <span className="block text-xs font-medium text-gray-800 dark:text-neutral-300">
                      From Htmlstream
                    </span>

                    <div className="w-full flex items-center gap-x-3">
                      <img
                        className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                        src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                        alt="Image Description"
                      ></img>
                      <div className="grow">
                        <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                          James Collison{" "}
                          <span className="text-xs font-normal text-gray-500 dark:text-neutral-500">
                            (you)
                          </span>
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-neutral-500">
                          james@site.com
                        </span>
                      </div>

                      <div className="relative">
                        <select
                          data-hs-select='{
                      "placeholder": "Select option...",
                      "toggleTag": "<button type=\"button\"></button>",
                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 ps-2.5 pe-6 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 text-xs text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                      "dropdownClasses": "end-0 mt-2 z-50 w-28 p-1 space-y-0.5 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950",
                      "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-1.5 px-2 w-full text-xs text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                      "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                    }'
                          className="hidden"
                        >
                          <option value="">Choose</option>
                          <option>Can view</option>
                          <option>Can edit</option>
                          <option selected>Admin</option>
                          <option>Remove</option>
                        </select>

                        <div className="absolute top-1/2 end-1.5 -translate-y-1/2">
                          <svg
                            className="flex-shrink-0 w-3.5 h-3.5 text-gray-600 dark:text-neutral-400"
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
                    </div>

                    <div className="w-full flex items-center gap-x-3">
                      <span className="flex flex-shrink-0 justify-center items-center w-[38px] h-[38px] bg-white border border-gray-200 text-gray-500 text-sm font-semibold rounded-full shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-500">
                        L
                      </span>
                      <div className="grow">
                        <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                          Liza Harrison
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-neutral-500">
                          liza@site.com
                        </span>
                      </div>

                      <div className="relative">
                        <select
                          data-hs-select='{
                      "placeholder": "Select option...",
                      "toggleTag": "<button type=\"button\"></button>",
                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 ps-2.5 pe-6 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 text-xs text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                      "dropdownClasses": "end-0 mt-2 z-50 w-28 p-1 space-y-0.5 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950",
                      "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-1.5 px-2 w-full text-xs text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                      "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                    }'
                          className="hidden"
                        >
                          <option value="">Choose</option>
                          <option selected>Can view</option>
                          <option>Can edit</option>
                          <option>Admin</option>
                          <option>Remove</option>
                        </select>

                        <div className="absolute top-1/2 end-1.5 -translate-y-1/2">
                          <svg
                            className="flex-shrink-0 w-3.5 h-3.5 text-gray-600 dark:text-neutral-400"
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
                    </div>

                    <div className="w-full flex items-center gap-x-3">
                      <img
                        className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                        src="https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                        alt="Image Description"
                      ></img>
                      <div className="grow">
                        <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                          Daniel Hobbs
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-neutral-500">
                          dhobbs@site.com
                        </span>
                      </div>

                      <div className="relative">
                        <select
                          data-hs-select='{
                      "placeholder": "Select option...",
                      "toggleTag": "<button type=\"button\"></button>",
                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 ps-2.5 pe-6 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 text-xs text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                      "dropdownClasses": "end-0 mt-2 z-50 w-28 p-1 space-y-0.5 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950",
                      "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-1.5 px-2 w-full text-xs text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                      "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                    }'
                          className="hidden"
                        >
                          <option value="">Choose</option>
                          <option>Can view</option>
                          <option selected>Can edit</option>
                          <option>Admin</option>
                          <option>Remove</option>
                        </select>

                        <div className="absolute top-1/2 end-1.5 -translate-y-1/2">
                          <svg
                            className="flex-shrink-0 w-3.5 h-3.5 text-gray-600 dark:text-neutral-400"
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
                    </div>

                    <button
                      type="button"
                      className="hs-collapse-toggle hs-collapse-open:hidden w-full text-start flex items-center gap-x-3 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                      id="hs-pro-dnshshmc"
                      data-hs-collapse="#hs-pro-dnshshmc-button"
                    >
                      <span className="flex flex-shrink-0 justify-center items-center w-[38px] h-[38px] text-sm font-semibold text-gray-500 rounded-lg dark:text-neutral-500">
                        <svg
                          className="flex-shrink-0 w-3.5 h-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                      </span>

                      <span className="grow">
                        <span className="text-xs text-gray-500 dark:text-neutral-500">
                          2 more people
                        </span>
                      </span>
                    </button>

                    <div
                      id="hs-pro-dnshshmc-button"
                      className="hs-collapse hidden w-full transition-none space-y-4"
                      aria-labelledby="hs-pro-dnshshmc"
                    >
                      <div className="w-full flex items-center gap-x-3">
                        <span className="flex flex-shrink-0 justify-center items-center w-[38px] h-[38px] bg-white border border-gray-200 text-gray-500 text-sm font-semibold rounded-full shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-500">
                          O
                        </span>
                        <div className="grow">
                          <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                            Ols Shols
                          </span>
                          <span className="block text-xs text-gray-500 dark:text-neutral-500">
                            ols@site.com
                          </span>
                        </div>

                        <div className="relative">
                          <select
                            data-hs-select='{
                        "placeholder": "Select option...",
                        "toggleTag": "<button type=\"button\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 ps-2.5 pe-6 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 text-xs text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                        "dropdownClasses": "end-0 mt-2 z-50 w-28 p-1 space-y-0.5 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950",
                        "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-1.5 px-2 w-full text-xs text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                      }'
                            className="hidden"
                          >
                            <option value="">Choose</option>
                            <option>Can view</option>
                            <option selected>Can edit</option>
                            <option>Admin</option>
                            <option>Remove</option>
                          </select>

                          <div className="absolute top-1/2 end-1.5 -translate-y-1/2">
                            <svg
                              className="flex-shrink-0 w-2.5 h-2.5 text-gray-600 dark:text-neutral-400"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex items-center gap-x-3">
                        <img
                          className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                          alt="Image Description"
                        ></img>
                        <div className="grow">
                          <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                            Crane
                          </span>
                          <span className="block text-xs text-gray-500 dark:text-neutral-500">
                            crane@site.com
                          </span>
                        </div>

                        <div className="relative">
                          <select
                            data-hs-select='{
                        "placeholder": "Select option...",
                        "toggleTag": "<button type=\"button\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 ps-2.5 pe-6 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 text-xs text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                        "dropdownClasses": "end-0 mt-2 z-50 w-28 p-1 space-y-0.5 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950",
                        "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-1.5 px-2 w-full text-xs text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                      }'
                            className="hidden"
                          >
                            <option value="">Choose</option>
                            <option selected>Can view</option>
                            <option>Can edit</option>
                            <option>Admin</option>
                            <option>Remove</option>
                          </select>

                          <div className="absolute top-1/2 end-1.5 -translate-y-1/2">
                            <svg
                              className="flex-shrink-0 w-2.5 h-2.5 text-gray-600 dark:text-neutral-400"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex items-center gap-x-3">
                      <img
                        className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                        src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                        alt="Image Description"
                      ></img>
                      <div className="grow">
                        <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                          Anna Richard
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-neutral-500">
                          anna@site.com
                        </span>
                      </div>

                      <div className="relative">
                        <select
                          data-hs-select='{
                      "placeholder": "Select option...",
                      "toggleTag": "<button type=\"button\"></button>",
                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1.5 ps-2.5 pe-6 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 text-xs text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                      "dropdownClasses": "end-0 mt-2 z-50 w-28 p-1 space-y-0.5 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950",
                      "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-1.5 px-2 w-full text-xs text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                      "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                    }'
                          className="hidden"
                        >
                          <option value="">Choose</option>
                          <option>Can view</option>
                          <option selected>Can edit</option>
                          <option>Admin</option>
                          <option>Remove</option>
                        </select>

                        <div className="absolute top-1/2 end-1.5 -translate-y-1/2">
                          <svg
                            className="flex-shrink-0 w-3.5 h-3.5 text-gray-600 dark:text-neutral-400"
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
                    </div>
                  </div>

                  <div className="p-5 border-t border-gray-200 dark:border-neutral-800">
                    <span className="block text-xs font-medium text-gray-800 mb-2 dark:text-neutral-300">
                      Share read-only link
                    </span>

                    <div className="flex items-center gap-x-2">
                      <input
                        id="hs-dshct"
                        type="text"
                        className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-600"
                        value="https://www.figma.com/community/file/1179068859697769656"
                      ></input>

                      <button
                        type="button"
                        className="js-clipboard [--is-toggle-tooltip:false] hs-tooltip w-[38px] h-[38px] flex-shrink-0 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-700"
                        data-clipboard-target="#hs-dshct"
                        data-clipboard-action="copy"
                        data-clipboard-success-text="Copied"
                      >
                        <svg
                          className="js-clipboard-default flex-shrink-0 w-4 h-4"
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
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        <svg
                          className="js-clipboard-success hidden w-4 h-4"
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
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span
                          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity hidden invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-lg shadow-sm dark:bg-neutral-700"
                          role="tooltip"
                        >
                          <span className="js-clipboard-success-text">Copy</span>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="py-3 px-5 border-t border-gray-200 dark:border-neutral-800">
                    <a
                      className="inline-flex items-center gap-x-1.5 text-xs text-gray-500 hover:underline font-medium focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
                      href="#"
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
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                      Read more about share
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <aside
          id="hs-pro-sidebar"
          className="w-[260px] hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700 dark:hs-overlay-backdrop-open:bg-neutral-900/90"
        >
          <div className="h-full p-4">
            <div className="relative h-full border border-dashed border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700">
              <div className="absolute inset-0 w-full h-full">
                <div className="w-full h-full bg-[linear-gradient(45deg,rgba(0,0,0,.05)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.05)_50%,rgba(0,0,0,.05)_57.14%,transparent_57.14%,transparent);] bg-[length:10px_10px] dark:bg-[linear-gradient(45deg,rgba(0,0,0,.4)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.4)_50%,rgba(0,0,0,.4)_57.14%,transparent_57.14%,transparent);]"></div>
              </div>
            </div>
          </div>

          <div className="lg:hidden absolute top-3 -end-3 z-10">
            <button
              type="button"
              className="w-6 h-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              data-hs-overlay="#hs-pro-sidebar"
              aria-controls="hs-pro-sidebar"
              aria-label="Toggle navigation"
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
        </aside>

        <main id="content" role="main" className="lg:ps-[260px] pt-[59px]">
          <div className="p-2 sm:p-5 md:pt-5 space-y-5">
            <div className="p-4 flex flex-col justify-center h-72 md:h-96 min-h-[calc(100vh-75px)] sm:min-h-[calc(100vh-99px)] bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
              <div className="relative h-full border border-dashed border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700">
                <div className="absolute inset-0 w-full h-full">
                  <div className="w-full h-full bg-[linear-gradient(45deg,rgba(0,0,0,.05)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.05)_50%,rgba(0,0,0,.05)_57.14%,transparent_57.14%,transparent);] bg-[length:10px_10px] dark:bg-[linear-gradient(45deg,rgba(0,0,0,.4)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.4)_50%,rgba(0,0,0,.4)_57.14%,transparent_57.14%,transparent);]"></div>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col justify-center h-72 md:h-96 min-h-[calc(100vh-75px)] sm:min-h-[calc(100vh-99px)] bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
              <div className="relative h-full border border-dashed border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700">
                <div className="absolute inset-0 w-full h-full">
                  <div className="w-full h-full bg-[linear-gradient(45deg,rgba(0,0,0,.05)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.05)_50%,rgba(0,0,0,.05)_57.14%,transparent_57.14%,transparent);] bg-[length:10px_10px] dark:bg-[linear-gradient(45deg,rgba(0,0,0,.4)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.4)_50%,rgba(0,0,0,.4)_57.14%,transparent_57.14%,transparent);]"></div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div
          id="hs-pro-dnsm"
          className="hs-overlay hs-overlay-backdrop-open:backdrop-blur-md hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none dark:hs-overlay-backdrop-open:bg-neutral-900/30"
        >
          <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
            <div className="max-h-full relative w-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                  <svg
                    className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-white/60"
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
                  type="text"
                  className="p-3 ps-10 block w-full bg-white border-transparent border-b-gray-200 rounded-t-lg text-sm focus:outline-none focus:ring-0 focus:border-transparent focus:border-b-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-transparent dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400"
                  placeholder="Search or type a command"
                  autoFocus
                ></input>
              </div>

              <div className="h-[500px] p-4 overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                  <span className="block text-xs text-gray-500 mb-2 dark:text-neutral-500">
                    Topics
                  </span>

                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <a
                      className="inline-flex items-center gap-x-1.5 text-xs font-medium text-gray-800 border border-gray-200 hover:bg-gray-100 py-1.5 px-2.5 rounded-full focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="#"
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
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                      </svg>
                      Inbox
                    </a>
                    <a
                      className="inline-flex items-center gap-x-1.5 text-xs font-medium text-gray-800 border border-gray-200 hover:bg-gray-100 py-1.5 px-2.5 rounded-full focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="#"
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
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                      Activity
                    </a>
                    <a
                      className="inline-flex items-center gap-x-1.5 text-xs font-medium text-gray-800 border border-gray-200 hover:bg-gray-100 py-1.5 px-2.5 rounded-full focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.9636 7.95706C14.9636 7.03203 13.8052 6.1554 12.0292 5.61175C12.439 3.80157 12.2569 2.36137 11.4542 1.90027C11.2692 1.79212 11.0529 1.74089 10.8167 1.74089V2.3756C10.9476 2.3756 11.0529 2.40121 11.1411 2.4496C11.5282 2.67161 11.6961 3.51695 11.5652 4.60419C11.5339 4.87174 11.4827 5.15351 11.4201 5.44099C10.8622 5.30438 10.2531 5.19907 9.61271 5.13076C9.22848 4.60419 8.82999 4.12602 8.42868 3.70764C9.35654 2.84523 10.2275 2.37275 10.8195 2.37275V1.73804C10.0368 1.73804 9.01216 2.2959 7.97612 3.26362C6.9401 2.30159 5.91546 1.74942 5.13274 1.74942V2.38413C5.72192 2.38413 6.59569 2.85376 7.52358 3.71049C7.12509 4.12887 6.72663 4.60419 6.34807 5.13076C5.70484 5.19907 5.09574 5.30438 4.53786 5.44384C4.47241 5.15921 4.42403 4.88314 4.38988 4.61842C4.25609 3.53117 4.42118 2.68584 4.80541 2.46098C4.89079 2.40975 5.0018 2.38698 5.13274 2.38698V1.75227C4.89364 1.75227 4.67732 1.8035 4.48948 1.91166C3.68969 2.37275 3.51038 3.81009 3.92308 5.6146C2.15272 6.16108 1 7.03488 1 7.95706C1 8.88209 2.15842 9.75872 3.93446 10.3024C3.52461 12.1126 3.70677 13.5528 4.50941 14.0138C4.69443 14.122 4.91072 14.1732 5.14982 14.1732C5.93254 14.1732 6.95718 13.6154 7.99319 12.6477C9.02924 13.6097 10.0539 14.1619 10.8366 14.1619C11.0757 14.1619 11.292 14.1106 11.4799 14.0025C12.2796 13.5414 12.4589 12.104 12.0463 10.2995C13.8109 9.7559 14.9636 8.87924 14.9636 7.95706ZM11.2578 6.05862C11.1525 6.42577 11.0216 6.80434 10.8736 7.1829C10.7569 6.9552 10.6345 6.72748 10.5007 6.49978C10.3698 6.27209 10.2303 6.0501 10.0909 5.83378C10.495 5.89356 10.885 5.96753 11.2578 6.05862ZM9.95427 9.08986C9.73225 9.4741 9.50455 9.83843 9.2683 10.1771C8.84422 10.2141 8.41446 10.2341 7.98182 10.2341C7.55203 10.2341 7.12227 10.2141 6.701 10.18C6.46479 9.84128 6.23424 9.4798 6.01222 9.09841C5.7959 8.72556 5.59951 8.347 5.42022 7.96561C5.59668 7.5842 5.7959 7.20282 6.00937 6.82996C6.23139 6.4457 6.45908 6.0814 6.69533 5.74269C7.11942 5.70569 7.54918 5.68576 7.98182 5.68576C8.41161 5.68576 8.84137 5.70569 9.26263 5.73984C9.49885 6.07855 9.7294 6.44003 9.95142 6.82141C10.1677 7.19427 10.3641 7.57283 10.5434 7.95421C10.3641 8.33562 10.1677 8.717 9.95427 9.08986ZM10.8736 8.71986C11.0273 9.10127 11.1582 9.48265 11.2664 9.85266C10.8935 9.94374 10.5007 10.0206 10.0937 10.0803C10.2332 9.86121 10.3727 9.63633 10.5036 9.40579C10.6345 9.17809 10.7569 8.94755 10.8736 8.71986ZM7.98752 11.7568C7.72282 11.4835 7.45812 11.179 7.19625 10.846C7.45242 10.8574 7.71427 10.8659 7.97897 10.8659C8.24652 10.8659 8.51121 10.8602 8.77024 10.846C8.51406 11.179 8.24937 11.4835 7.98752 11.7568ZM5.8699 10.0803C5.46575 10.0206 5.07581 9.94659 4.70295 9.85551C4.80826 9.48835 4.9392 9.10979 5.08719 8.73123C5.2039 8.95895 5.32628 9.18665 5.46004 9.41434C5.59383 9.64204 5.73044 9.86403 5.8699 10.0803ZM7.97329 4.15735C8.23799 4.43058 8.50269 4.73513 8.76454 5.06813C8.50836 5.05676 8.24652 5.0482 7.98182 5.0482C7.71427 5.0482 7.44957 5.05391 7.19057 5.06813C7.44672 4.73513 7.71142 4.43058 7.97329 4.15735ZM5.86705 5.83378C5.72759 6.05295 5.58813 6.27779 5.45719 6.50834C5.32628 6.73603 5.2039 6.96372 5.08719 7.19142C4.9335 6.81004 4.80256 6.42863 4.69443 6.05862C5.06726 5.97039 5.46004 5.89356 5.86705 5.83378ZM3.29122 9.39727C2.28365 8.96748 1.63186 8.40393 1.63186 7.95706C1.63186 7.5102 2.28365 6.9438 3.29122 6.51686C3.536 6.41155 3.80354 6.31764 4.07962 6.22941C4.24186 6.78726 4.45533 7.36788 4.72003 7.96276C4.45818 8.55476 4.24756 9.13257 4.08817 9.68756C3.80639 9.59933 3.53884 9.50257 3.29122 9.39727ZM4.82249 13.4645C4.4354 13.2425 4.26749 12.3972 4.3984 11.3099C4.4297 11.0424 4.48096 10.7606 4.54356 10.4731C5.10144 10.6097 5.71052 10.7151 6.35092 10.7834C6.73516 11.3099 7.13364 11.7881 7.53495 12.2065C6.6071 13.0689 5.73615 13.5414 5.14412 13.5414C5.01603 13.5385 4.90787 13.5129 4.82249 13.4645ZM11.5738 11.2957C11.7075 12.383 11.5425 13.2283 11.1582 13.4531C11.0728 13.5044 10.9618 13.5272 10.8309 13.5272C10.2417 13.5272 9.36794 13.0575 8.44006 12.2008C8.83854 11.7824 9.237 11.3071 9.61556 10.7805C10.2588 10.7122 10.8679 10.6069 11.4258 10.4674C11.4912 10.7549 11.5425 11.031 11.5738 11.2957ZM12.6696 9.39727C12.4248 9.50257 12.1572 9.59651 11.8812 9.68474C11.7189 9.12687 11.5055 8.54624 11.2408 7.95136C11.5026 7.35936 11.7132 6.78156 11.8726 6.22656C12.1544 6.31479 12.4219 6.41155 12.6724 6.51686C13.68 6.94665 14.3318 7.5102 14.3318 7.95706C14.3289 8.40393 13.6771 8.97033 12.6696 9.39727Z" />
                        <path d="M7.97885 9.25778C8.69722 9.25778 9.27959 8.67543 9.27959 7.95706C9.27959 7.23869 8.69722 6.65632 7.97885 6.65632C7.26048 6.65632 6.67814 7.23869 6.67814 7.95706C6.67814 8.67543 7.26048 9.25778 7.97885 9.25778Z" />
                      </svg>
                      React
                    </a>
                    <a
                      className="inline-flex items-center gap-x-1.5 text-xs font-medium text-gray-800 border border-gray-200 hover:bg-gray-100 py-1.5 px-2.5 rounded-full focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      href="#"
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
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" x2="8" y1="13" y2="13" />
                        <line x1="16" x2="8" y1="17" y2="17" />
                        <line x1="10" x2="8" y1="9" y2="9" />
                      </svg>
                      Files
                    </a>
                  </div>
                </div>

                <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                  <span className="block text-xs text-gray-500 mb-2 dark:text-neutral-500">
                    Recent
                  </span>

                  <ul className="-mx-2.5">
                    <li>
                      <a
                        className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5"
                          width="33"
                          height="32"
                          viewBox="0 0 33 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_11766_122209)">
                            <path
                              d="M3.11931 28.4817H8.21019V16.1181L0.937439 10.6636V26.3C0.937439 27.5054 1.91381 28.4819 3.11931 28.4819V28.4817Z"
                              fill="#4285F4"
                            />
                            <path
                              d="M25.6647 28.4817H30.7556C31.961 28.4817 32.9374 27.5054 32.9374 26.2999V10.6636L25.6647 16.1181V28.4817Z"
                              fill="#34A853"
                            />
                            <path
                              d="M25.6647 6.66356V16.1181L32.9374 10.6636V7.7545C32.9374 5.05812 29.8593 3.51812 27.701 5.13631L25.6647 6.66356Z"
                              fill="#FBBC04"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.21021 16.1181V6.66356L16.9375 13.2091L25.6647 6.66356V16.1181L16.9375 22.6636L8.21021 16.1181Z"
                              fill="#EA4335"
                            />
                            <path
                              d="M0.937439 7.7545V10.6636L8.21019 16.1181V6.66356L6.17381 5.13631C4.01556 3.51813 0.937439 5.05813 0.937439 7.75438V7.7545Z"
                              fill="#C5221F"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_11766_122209">
                              <rect
                                width="32"
                                height="32"
                                fill="white"
                                transform="translate(0.937439)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          Compose an email
                        </span>
                        <span className="text-xs text-gray-400 dark:text-neutral-500">Gmail</span>

                        <div className="ms-auto inline-flex items-center gap-x-1">
                          <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                            <svg
                              className="flex-shrink-0 w-2.5 h-2.5 text-gray-500 dark:text-neutral-500"
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
                              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                          </div>
                          <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                            <svg
                              className="flex-shrink-0 w-2.5 h-2.5 text-gray-500 dark:text-neutral-500"
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
                          </div>
                        </div>
                      </a>
                    </li>

                    <li>
                      <a
                        className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.7326 0C9.96372 0.00130479 8.53211 1.43397 8.53342 3.19935C8.53211 4.96473 9.96503 6.39739 11.7339 6.39869H14.9345V3.20065C14.9358 1.43527 13.5029 0.00260958 11.7326 0C11.7339 0 11.7339 0 11.7326 0M11.7326 8.53333H3.20053C1.43161 8.53464 -0.00130383 9.9673 3.57297e-06 11.7327C-0.00261123 13.4981 1.4303 14.9307 3.19922 14.9333H11.7326C13.5016 14.932 14.9345 13.4994 14.9332 11.734C14.9345 9.9673 13.5016 8.53464 11.7326 8.53333Z"
                            fill="#36C5F0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M32 11.7327C32.0013 9.9673 30.5684 8.53464 28.7995 8.53333C27.0306 8.53464 25.5976 9.9673 25.5989 11.7327V14.9333H28.7995C30.5684 14.932 32.0013 13.4994 32 11.7327ZM23.4666 11.7327V3.19935C23.4679 1.43527 22.0363 0.00260958 20.2674 0C18.4984 0.00130479 17.0655 1.43397 17.0668 3.19935V11.7327C17.0642 13.4981 18.4971 14.9307 20.2661 14.9333C22.035 14.932 23.4679 13.4994 23.4666 11.7327Z"
                            fill="#2EB67D"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20.2661 32C22.035 31.9987 23.4679 30.566 23.4666 28.8007C23.4679 27.0353 22.035 25.6026 20.2661 25.6013H17.0656V28.8007C17.0642 30.5647 18.4972 31.9974 20.2661 32ZM20.2661 23.4654H28.7995C30.5684 23.4641 32.0013 22.0314 32 20.266C32.0026 18.5006 30.5697 17.068 28.8008 17.0654H20.2674C18.4985 17.0667 17.0656 18.4993 17.0669 20.2647C17.0656 22.0314 18.4972 23.4641 20.2661 23.4654Z"
                            fill="#ECB22E"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.93953e-07 20.266C-0.00130651 22.0314 1.43161 23.4641 3.20052 23.4654C4.96944 23.4641 6.40235 22.0314 6.40105 20.266V17.0667H3.20052C1.43161 17.068 -0.00130651 18.5006 8.93953e-07 20.266ZM8.53342 20.266V28.7993C8.5308 30.5647 9.96372 31.9974 11.7326 32C13.5016 31.9987 14.9345 30.566 14.9332 28.8007V20.2686C14.9358 18.5032 13.5029 17.0706 11.7339 17.068C9.96372 17.068 8.53211 18.5006 8.53342 20.266C8.53342 20.2673 8.53342 20.266 8.53342 20.266Z"
                            fill="#E01E5A"
                          />
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          Start a conversation
                        </span>
                        <span className="text-xs text-gray-400 dark:text-neutral-500">Slack</span>

                        <div className="ms-auto inline-flex items-center gap-x-1">
                          <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                            <svg
                              className="flex-shrink-0 w-2.5 h-2.5 text-gray-500 dark:text-neutral-500"
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
                              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                          </div>
                          <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                            <svg
                              className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-neutral-500"
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
                              <path d="m18 15-6-6-6 6" />
                            </svg>
                          </div>
                          <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                            S
                          </div>
                        </div>
                      </a>
                    </li>

                    <li>
                      <a
                        className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.7438 0.940745C6.84695 1.30308 2.6841 1.63631 2.48837 1.67533C1.9396 1.77319 1.44038 2.14544 1.20563 2.63537L1 3.06646L1.01982 13.3407L1.04893 23.615L1.36234 24.2517C1.53886 24.6042 2.73365 26.2499 4.0362 27.9439C6.61221 31.2836 6.79802 31.47 7.77726 31.5679C8.06156 31.597 10.1966 31.4991 12.5081 31.3622C14.8295 31.2154 18.5508 30.99 20.7842 30.863C30.3233 30.2839 29.8334 30.3328 30.3815 29.8627C31.0672 29.2947 31.0183 30.2251 31.0474 17.7377C31.0672 7.15003 31.0573 6.45509 30.9006 6.13177C30.7148 5.76943 30.3815 5.51487 26.0329 2.45885C23.1243 0.421704 22.9186 0.313932 21.6155 0.294111C21.0772 0.274911 16.6307 0.568497 11.7438 0.940745ZM22.752 2.28232C23.1633 2.46814 26.1704 4.56412 26.6108 4.9661C26.7284 5.08378 26.7675 5.18164 26.7086 5.24048C26.5717 5.35817 7.96245 6.465 7.42421 6.38634C7.17956 6.34732 6.81722 6.20052 6.61159 6.06302C5.75932 5.48514 3.64413 3.75149 3.64413 3.62452C3.64413 3.29129 3.57538 3.29129 11.8714 2.69421C13.4582 2.58644 16.0633 2.39071 17.6502 2.26312C21.0871 1.98874 22.1159 1.99865 22.752 2.28232ZM28.6677 7.63996C28.8046 7.77685 28.9223 8.04132 28.9613 8.29589C28.9904 8.53125 29.0102 12.9189 28.9904 18.0313C28.9613 26.8067 28.9514 27.3555 28.7848 27.61C28.6869 27.7667 28.4912 27.9333 28.3438 27.9823C27.9331 28.1489 8.43318 29.2557 8.03183 29.138C7.84601 29.0891 7.59083 28.9324 7.45394 28.7955L7.21858 28.541L7.18947 19.0799C7.16965 12.4395 7.18947 9.5012 7.26813 9.23673C7.32697 9.041 7.47376 8.80564 7.60136 8.72759C7.77788 8.60991 8.93364 8.51205 12.9101 8.2773C15.7016 8.1206 20.0206 7.85613 22.4987 7.70933C28.3933 7.34638 28.3741 7.34638 28.6677 7.63996Z"
                            className="fill-black dark:fill-neutral-200"
                            fill="currentColor"
                          />
                          <path
                            d="M23.4277 10.8818C22.3698 10.9506 21.4296 11.0484 21.3218 11.1073C20.9985 11.2739 20.8028 11.5483 20.7638 11.8617C20.7347 12.185 20.8325 12.224 21.8898 12.3516L22.35 12.4104V16.5925C22.35 19.0799 22.311 20.7256 22.2621 20.6767C22.2131 20.6178 20.8226 18.5027 19.167 15.9756C17.512 13.4392 16.1407 11.3525 16.1209 11.3333C16.1011 11.3135 15.024 11.3724 13.7313 11.4609C12.1445 11.5687 11.273 11.6666 11.0965 11.7644C10.8122 11.9112 10.4988 12.4303 10.4988 12.7734C10.4988 12.979 10.871 13.0868 11.6545 13.0868H12.0658V25.1139L11.4 25.3196C10.8809 25.4763 10.7044 25.5741 10.6165 25.7698C10.4598 26.1031 10.4697 26.4066 10.6264 26.4066C10.6852 26.4066 11.792 26.3378 13.0649 26.2598C15.582 26.113 15.8657 26.0442 16.1302 25.5252C16.2088 25.3685 16.277 25.2019 16.277 25.1529C16.277 25.1139 15.9345 24.9962 15.5226 24.8984C15.1014 24.8005 14.6802 24.7027 14.5923 24.6828C14.4257 24.6339 14.4157 24.3304 14.4157 20.1186V15.6033L17.3931 20.2753C20.5173 25.1721 20.9093 25.7308 21.3893 25.9755C21.987 26.2889 23.5051 26.0733 24.2688 25.5741L24.5042 25.4273L24.524 18.7479L24.5531 12.0586L25.0722 11.9608C25.6891 11.8431 25.9734 11.5594 25.9734 11.0695C25.9734 10.7561 25.9536 10.7362 25.66 10.7462C25.4847 10.7542 24.4757 10.813 23.4277 10.8818Z"
                            className="fill-black dark:fill-neutral-200"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          Create a project
                        </span>
                        <span className="text-xs text-gray-400 dark:text-neutral-500">Notion</span>

                        <div className="ms-auto inline-flex items-center gap-x-1">
                          <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                            <svg
                              className="flex-shrink-0 w-2.5 h-2.5 text-gray-500 dark:text-neutral-500"
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
                              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                          </div>
                          <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 rounded dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                            N
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="pb-4 mb-4 border-b border-gray-200 dark:border-neutral-700">
                  <span className="block text-xs text-gray-500 mb-2 dark:text-neutral-500">
                    Files
                  </span>

                  <ul className="-mx-2.5">
                    <li>
                      <a
                        className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5"
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
                          <path
                            d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                            fill="#107C41"
                          />
                          <path
                            d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                            fill="#33C481"
                          />
                          <path
                            d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                            fill="#185C37"
                          />
                          <path
                            d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                            fill="#107C41"
                          />
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
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          weekly-reports.xls
                        </span>
                        <span className="text-xs text-gray-400 dark:text-neutral-500">
                          04 Dec 2022
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                            fill="#41A5EE"
                          />
                          <path
                            d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                            fill="#2B7CD3"
                          />
                          <path
                            d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                            fill="#185ABD"
                          />
                          <path
                            d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                            fill="#103F91"
                          />
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
                            d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                            fill="#185ABD"
                          />
                          <path
                            d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                            fill="white"
                          />
                        </svg>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          my-file.docx
                        </span>
                        <span className="text-xs text-gray-400 dark:text-neutral-500">
                          30 Dec 2022
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="block text-xs text-gray-500 mb-2 dark:text-neutral-500">
                    People
                  </span>

                  <ul className="-mx-2.5">
                    <li>
                      <a
                        className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <img
                          className="flex-shrink-0 w-5 h-5 rounded-full"
                          src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                          alt="Image Description"
                        ></img>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          Kim Ya Sung
                        </span>
                        <span className="text-xs text-teal-600">Active now</span>
                      </a>
                    </li>

                    <li>
                      <a
                        className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <img
                          className="flex-shrink-0 w-5 h-5 rounded-full"
                          src="https://images.unsplash.com/photo-1610186593977-82a3e3696e7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                          alt="Image Description"
                        ></img>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          Chris Peti
                        </span>
                        <span className="text-xs text-gray-400 dark:text-neutral-500">
                          Last seen 2 min ago
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        className="py-2 px-3 flex items-center gap-x-3 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        href="#"
                      >
                        <img
                          className="flex-shrink-0 w-5 h-5 rounded-full"
                          src="https://images.unsplash.com/photo-1568048689711-5e0325cea8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                          alt="Image Description"
                        ></img>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          Martin Azara
                        </span>
                        <span className="text-xs text-gray-400 dark:text-neutral-500">
                          Last seen yesterday
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 flex justify-between items-center border-t border-gray-200 dark:border-neutral-700">
                <div className="inline-flex items-center gap-x-2">
                  <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 shadow-sm rounded dark:bg-neutral-800 dark:border-neutral-700">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-neutral-500"
                      width="16"
                      height="7"
                      viewBox="0 0 16 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5 4.99712C14.3882 5.37064 13.7772 6 12.938 6C12.0987 6 11.2022 5.04455 11.2022 3.78386V3.19193C11.2022 1.8838 12.0314 1.00102 12.938 1.00102C13.8447 1.00102 14.3662 1.49912 14.5 2.11899M9.65213 1.93635C9.51016 1.44272 8.86395 0.975267 8.11903 1.00102C7.37431 1.02666 6.70773 1.59524 6.70773 2.26932C6.70773 2.9434 7.14855 3.18797 8.11955 3.29149C9.09034 3.39501 9.61853 3.95222 9.65213 4.54259C9.68573 5.13296 9.1754 6 8.11955 6C7.19423 6 6.50191 5.06384 6.46306 4.52706M4.91442 5.08667C4.63772 5.70602 4.06396 5.9999 3.29279 5.9999C2.52162 5.9999 1.5 5.34854 1.5 3.70223V3.22237C1.5 2.13651 2.2571 1.00081 3.29279 1.00081C4.32858 1.00081 5.01753 2.07562 4.91442 3.34559H1.8104"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-neutral-500">to close</span>
                </div>

                <div className="inline-flex items-center gap-x-4">
                  <div className="inline-flex items-center gap-x-2">
                    <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 shadow-sm rounded dark:bg-neutral-800 dark:border-neutral-700">
                      <svg
                        className="flex-shrink-0 w-3 h-3 text-gray-400 dark:text-neutral-500"
                        width="12"
                        height="11"
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5 1V4.375C10.5 5.5 9.375 6.625 8.25 6.625H1.5M1.5 6.625L4.875 10M1.5 6.625L4.875 3.25"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-neutral-500">to select</span>
                  </div>

                  <div className="inline-flex items-center gap-x-2">
                    <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 shadow-sm rounded dark:bg-neutral-800 dark:border-neutral-700">
                      <svg
                        className="flex-shrink-0 w-3 h-3 text-gray-400 dark:text-neutral-500"
                        width="10"
                        height="11"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 1V10M5 10L8.5 6.625M5 10L1.5 6.625"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="w-5 h-5 flex flex-col justify-center items-center bg-white border border-gray-200 text-xs uppercase text-gray-400 shadow-sm rounded dark:bg-neutral-800 dark:border-neutral-700">
                      <svg
                        className="flex-shrink-0 w-3 h-3 text-gray-400 dark:text-neutral-500"
                        width="10"
                        height="11"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 10V1M5 1L8.5 4.375M5 1L1.5 4.375"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-neutral-500">to navigate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="hs-pro-dasadam"
          className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none [--close-when-click-inside:true] dark:hs-overlay-backdrop-open:bg-neutral-900/90"
        >
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
            <div className="max-h-full w-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]">
              <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
                <h3 className="font-semibold text-gray-800 dark:text-neutral-200">
                  Add team account
                </h3>

                <button
                  type="button"
                  className="w-8 h-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  data-hs-overlay="#hs-pro-dasadam"
                >
                  <span className="sr-only">Close modal</span>
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
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <form>
                <div className="p-4">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="hs-pro-dasadamtn"
                        className="block mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200"
                      >
                        Team name
                      </label>

                      <input
                        id="hs-pro-dasadamtn"
                        type="text"
                        className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm text-gray-800 focus:z-10 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
                        placeholder="Preline"
                      ></input>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="hs-pro-dasadamtn"
                        className="block mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200"
                      >
                        Subscription plan
                      </label>

                      <div className="relative">
                        <select
                          data-hs-select='{
                      "placeholder": "Select a plan",
                      "toggleTag": "<button type=\"button\"></button>",
                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-500",
                      "dropdownClasses": "mt-2 z-50 w-full min-w-[140px] max-h-[300px] p-1 space-y-0.5 overflow-hidden overflow-y-auto bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900",
                      "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-gray-200",
                      "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                    }'
                          className="hidden"
                        >
                          <option value="">Choose</option>
                          <option>Pro (Monthly - $59 / user / month)</option>
                          <option>Free - (Free forever)</option>
                        </select>

                        <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                          <svg
                            className="flex-shrink-0 w-[17px] h-[17px] text-neutral-500"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.35355 4.06066C8.15829 3.8654 7.84171 3.8654 7.64645 4.06066L5.35355 6.35355C5.15829 6.54882 4.84171 6.54882 4.64645 6.35355C4.45118 6.15829 4.45118 5.84171 4.64645 5.64645L6.93934 3.35356C7.52513 2.76777 8.47487 2.76777 9.06066 3.35355L11.3536 5.64645C11.5488 5.84171 11.5488 6.15829 11.3536 6.35355C11.1583 6.54882 10.8417 6.54882 10.6464 6.35355L8.35355 4.06066Z"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.35355 11.9393C8.15829 12.1346 7.84171 12.1346 7.64645 11.9393L5.35355 9.64645C5.15829 9.45119 4.84171 9.45119 4.64645 9.64645C4.45118 9.84171 4.45118 10.1583 4.64645 10.3536L6.93934 12.6464C7.52513 13.2322 8.47487 13.2322 9.06066 12.6464L11.3536 10.3536C11.5488 10.1583 11.5488 9.84171 11.3536 9.64645C11.1583 9.45119 10.8417 9.45119 10.6464 9.64645L8.35355 11.9393Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex justify-end gap-x-2">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    data-hs-overlay="#hs-pro-dasadam"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-hs-overlay="#hs-pro-deum"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          id="hs-pro-dnam"
          className="hs-overlay hs-overlay-open:translate-x-0  translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full w-full sm:w-[400px] z-[80] flex flex-col bg-white border-s  dark:bg-neutral-800 dark:border-neutral-700 dark:hs-overlay-backdrop-open:bg-neutral-900/90"
          tabIndex={-1}
        >
          <div className="flex justify-between items-center py-3 px-5 border-b dark:border-neutral-700">
            <h3 className="font-semibold text-gray-800 dark:text-neutral-200">Activity</h3>
            <button
              type="button"
              className="w-8 h-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
              data-hs-overlay="#hs-pro-dnam"
            >
              <span className="sr-only">Close offcanvas</span>
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="px-5 py-7 h-full overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div>
              <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="w-full flex gap-x-5">
                  <img
                    className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                    src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                    alt="Image Description"
                  ></img>

                  <div className="grow">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                      James Collins
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Added 2 files to task
                      <a
                        className="ms-1 align-middle inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
                        href="#"
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
                          <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                        </svg>
                        PR-3
                      </a>
                    </p>

                    <div className="mt-2 grid grid-cols-2 gap-x-2">
                      <div className="border border-gray-200 rounded-lg p-2 dark:border-neutral-700">
                        <div className="flex gap-x-2">
                          <svg
                            className="flex-shrink-0 w-6 h-6"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.7438 0.940745C6.84695 1.30308 2.6841 1.63631 2.48837 1.67533C1.9396 1.77319 1.44038 2.14544 1.20563 2.63537L1 3.06646L1.01982 13.3407L1.04893 23.615L1.36234 24.2517C1.53886 24.6042 2.73365 26.2499 4.0362 27.9439C6.61221 31.2836 6.79802 31.47 7.77726 31.5679C8.06156 31.597 10.1966 31.4991 12.5081 31.3622C14.8295 31.2154 18.5508 30.99 20.7842 30.863C30.3233 30.2839 29.8334 30.3328 30.3815 29.8627C31.0672 29.2947 31.0183 30.2251 31.0474 17.7377C31.0672 7.15003 31.0573 6.45509 30.9006 6.13177C30.7148 5.76943 30.3815 5.51487 26.0329 2.45885C23.1243 0.421704 22.9186 0.313932 21.6155 0.294111C21.0772 0.274911 16.6307 0.568497 11.7438 0.940745ZM22.752 2.28232C23.1633 2.46814 26.1704 4.56412 26.6108 4.9661C26.7284 5.08378 26.7675 5.18164 26.7086 5.24048C26.5717 5.35817 7.96245 6.465 7.42421 6.38634C7.17956 6.34732 6.81722 6.20052 6.61159 6.06302C5.75932 5.48514 3.64413 3.75149 3.64413 3.62452C3.64413 3.29129 3.57538 3.29129 11.8714 2.69421C13.4582 2.58644 16.0633 2.39071 17.6502 2.26312C21.0871 1.98874 22.1159 1.99865 22.752 2.28232ZM28.6677 7.63996C28.8046 7.77685 28.9223 8.04132 28.9613 8.29589C28.9904 8.53125 29.0102 12.9189 28.9904 18.0313C28.9613 26.8067 28.9514 27.3555 28.7848 27.61C28.6869 27.7667 28.4912 27.9333 28.3438 27.9823C27.9331 28.1489 8.43318 29.2557 8.03183 29.138C7.84601 29.0891 7.59083 28.9324 7.45394 28.7955L7.21858 28.541L7.18947 19.0799C7.16965 12.4395 7.18947 9.5012 7.26813 9.23672C7.32697 9.041 7.47376 8.80564 7.60136 8.72759C7.77788 8.60991 8.93364 8.51205 12.9101 8.2773C15.7016 8.1206 20.0206 7.85613 22.4987 7.70933C28.3933 7.34638 28.3741 7.34638 28.6677 7.63996Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                            <path
                              d="M23.4277 10.8818C22.3698 10.9506 21.4296 11.0484 21.3218 11.1073C20.9985 11.2739 20.8028 11.5483 20.7638 11.8617C20.7347 12.185 20.8325 12.224 21.8898 12.3516L22.35 12.4104V16.5925C22.35 19.0799 22.311 20.7256 22.2621 20.6767C22.2131 20.6178 20.8226 18.5027 19.167 15.9756C17.512 13.4392 16.1407 11.3525 16.1209 11.3333C16.1011 11.3135 15.024 11.3724 13.7313 11.4609C12.1445 11.5687 11.273 11.6666 11.0965 11.7644C10.8122 11.9112 10.4988 12.4303 10.4988 12.7734C10.4988 12.979 10.871 13.0868 11.6545 13.0868H12.0658V25.1139L11.4 25.3196C10.8809 25.4763 10.7044 25.5741 10.6165 25.7698C10.4598 26.1031 10.4697 26.4066 10.6264 26.4066C10.6852 26.4066 11.792 26.3378 13.0649 26.2598C15.582 26.113 15.8657 26.0442 16.1302 25.5252C16.2088 25.3685 16.277 25.2019 16.277 25.1529C16.277 25.1139 15.9345 24.9962 15.5226 24.8984C15.1014 24.8005 14.6802 24.7027 14.5923 24.6828C14.4257 24.6339 14.4157 24.3304 14.4157 20.1186V15.6033L17.3931 20.2753C20.5173 25.1721 20.9093 25.7308 21.3893 25.9755C21.987 26.2889 23.5051 26.0733 24.2688 25.5741L24.5042 25.4273L24.524 18.7479L24.5531 12.0586L25.0722 11.9608C25.6891 11.8431 25.9734 11.5594 25.9734 11.0695C25.9734 10.7561 25.9536 10.7362 25.66 10.7462C25.4847 10.7542 24.4757 10.813 23.4277 10.8818Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                          </svg>
                          <div className="grow truncate">
                            <p className="block truncate text-xs text-gray-800 dark:text-neutral-300">
                              list-of-users
                            </p>
                            <small className="block text-xs text-gray-400 dark:text-neutral-500">
                              35kb
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-2 dark:border-neutral-700">
                        <div className="flex gap-x-2">
                          <svg
                            className="flex-shrink-0 w-6 h-6"
                            width="33"
                            height="32"
                            viewBox="0 0 33 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.0001 0C7.16461 0 0 7.34466 0 16.405C0 23.6533 4.5845 29.8026 10.9419 31.9718C11.7415 32.1236 12.0351 31.6159 12.0351 31.1826C12.0351 30.7915 12.0202 29.4991 12.0134 28.1283C7.56202 29.1207 6.62276 26.1927 6.62276 26.1927C5.89494 24.2965 4.84626 23.7924 4.84626 23.7924C3.39464 22.7742 4.95568 22.795 4.95568 22.795C6.5624 22.9108 7.40843 24.4856 7.40843 24.4856C8.83545 26.9936 11.1514 26.2685 12.0645 25.8495C12.208 24.789 12.6227 24.0654 13.0803 23.6558C9.5265 23.2408 5.79054 21.8342 5.79054 15.5483C5.79054 13.7573 6.41559 12.2938 7.43917 11.1449C7.27303 10.7317 6.72541 9.0632 7.59415 6.80351C7.59415 6.80351 8.93772 6.36259 11.9953 8.48512C13.2715 8.12152 14.6403 7.93934 16.0001 7.93316C17.3598 7.93934 18.7296 8.12152 20.0083 8.48512C23.0623 6.36259 24.404 6.80351 24.404 6.80351C25.2748 9.0632 24.727 10.7317 24.5608 11.1449C25.5867 12.2938 26.2075 13.7572 26.2075 15.5483C26.2075 21.8491 22.4645 23.2366 18.9017 23.6426C19.4755 24.1518 19.9869 25.1502 19.9869 26.6806C19.9869 28.8756 19.9683 30.6422 19.9683 31.1826C19.9683 31.6192 20.2563 32.1307 21.0674 31.9696C27.4213 29.798 32 23.6509 32 16.405C32 7.34466 24.8364 0 16.0001 0Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                            <path
                              d="M5.99251 23.3693C5.95737 23.4508 5.83213 23.4752 5.71832 23.4194C5.60224 23.3658 5.53699 23.2547 5.57464 23.1728C5.60915 23.089 5.73438 23.0655 5.8502 23.1219C5.96653 23.1753 6.03279 23.2875 5.99251 23.3693ZM6.77955 24.0893C6.70326 24.1619 6.55405 24.1282 6.45279 24.0135C6.34813 23.8991 6.32856 23.7463 6.40598 23.6726C6.48466 23.6001 6.62935 23.634 6.73425 23.7485C6.83891 23.8641 6.85924 24.0161 6.77943 24.0894M7.31952 25.0105C7.22139 25.0804 7.06102 25.0149 6.96201 24.869C6.864 24.7232 6.864 24.5482 6.96414 24.4781C7.06353 24.408 7.22139 24.471 7.32178 24.6158C7.41965 24.7641 7.41965 24.9391 7.31939 25.0107M8.23255 26.0775C8.14484 26.1766 7.95811 26.1501 7.82133 26.0147C7.68154 25.8825 7.64252 25.6947 7.73048 25.5955C7.8192 25.4962 8.00705 25.5241 8.14484 25.6583C8.28375 25.7903 8.32604 25.9795 8.23255 26.0775ZM9.41262 26.4378C9.3741 26.5662 9.19415 26.6246 9.01295 26.57C8.832 26.5138 8.71354 26.3633 8.75006 26.2335C8.7877 26.1041 8.9684 26.0433 9.15098 26.1017C9.33168 26.1577 9.45027 26.307 9.41262 26.4378ZM10.7558 26.5905C10.7603 26.7258 10.6066 26.838 10.4164 26.8405C10.225 26.8447 10.0703 26.7352 10.0683 26.6022C10.0683 26.4656 10.2185 26.3544 10.4097 26.3512C10.6 26.3473 10.7558 26.456 10.7558 26.5905ZM12.0752 26.5386C12.098 26.6706 11.9658 26.8063 11.7769 26.8423C11.5912 26.877 11.4193 26.7956 11.3955 26.6647C11.3725 26.5294 11.5072 26.3939 11.6926 26.3588C11.8818 26.3251 12.0511 26.4044 12.0752 26.5386Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                          </svg>
                          <div className="grow truncate">
                            <p className="block truncate text-xs text-gray-800 dark:text-neutral-300">
                              untitled
                            </p>
                            <small className="block text-xs text-gray-400 dark:text-neutral-500">
                              30kb
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-2 text-[11px] uppercase text-gray-400 dark:text-neutral-500">
                      May 04
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="w-full flex gap-x-5">
                  <span className="flex flex-shrink-0 justify-center items-center w-[38px] h-[38px] border border-gray-200 text-sm font-semibold uppercase text-gray-800 rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                    B
                  </span>

                  <div className="grow">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                      Bob Dean
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Marked
                      <a
                        className="align-middle inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-400 focus:outline-none focus:underline dark:hover:text-blue-500 dark:focus:outline-none"
                        href="#"
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
                          <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                        </svg>
                        PR-6
                      </a>
                      as
                      <span className="ms-0.5 inline-block align-middle py-1 px-1.5 border border-gray-200 text-xs font-medium text-gray-800 rounded-md dark:border-neutral-700 dark:text-neutral-300">
                        Completed
                      </span>
                    </p>

                    <p className="mt-2 text-[11px] uppercase text-gray-400 dark:text-neutral-500">
                      Today
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="w-full flex gap-x-5">
                  <img
                    className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                    alt="Image Description"
                  ></img>

                  <div className="grow">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                      Crane
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Added 5 card to
                      <a
                        className="ms-1 align-middle inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
                        href="#"
                      >
                        Payments
                      </a>
                    </p>

                    <div className="mt-2 flex gap-x-2">
                      <div className="grow grid grid-cols-3 gap-x-2">
                        <img
                          className="w-full h-12 object-cover rounded-md"
                          src="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
                          alt="Image Description"
                        ></img>
                        <img
                          className="w-full h-12 object-cover rounded-md"
                          src="https://images.unsplash.com/photo-1635776063328-153b13e3c245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
                          alt="Image Description"
                        ></img>
                        <img
                          className="w-full h-12 object-cover rounded-md"
                          src="https://images.unsplash.com/photo-1635776064096-4e12cce9ead4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
                          alt="Image Description"
                        ></img>
                      </div>

                      <div>
                        <a
                          className="h-full inline-flex flex-col justify-center items-center border border-gray-200 text-xs font-medium text-gray-500 rounded-lg p-1.5 hover:text-blue-600 focus:outline-none focus:bg-gray-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                          href="#"
                        >
                          +2
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="w-full flex gap-x-5">
                  <span className="flex flex-shrink-0 justify-center items-center w-[38px] h-[38px] border border-gray-200 text-sm font-semibold uppercase text-gray-800 rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
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
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </span>

                  <div className="grow">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                      Project status updated
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Marked
                      <a
                        className="align-middle inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-400 focus:outline-none focus:underline dark:hover:text-blue-500 dark:focus:outline-none"
                        href="#"
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
                          <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                        </svg>
                        PR-3
                      </a>
                      as
                      <span className="ms-0.5 inline-block align-middle py-1 px-1.5 bg-gray-100 text-xs font-medium text-gray-800 rounded-md dark:bg-neutral-700 dark:text-neutral-300">
                        In progress
                      </span>
                    </p>

                    <p className="mt-2 text-[11px] uppercase text-gray-400 dark:text-neutral-500">
                      Feb 10
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="w-full flex gap-x-5">
                  <img
                    className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                    src="https://images.unsplash.com/photo-1610186593977-82a3e3696e7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                    alt="Image Description"
                  ></img>

                  <div className="grow">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                      Mark Colbert
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Earned a Top endorsed badge
                    </p>

                    <p className="mt-2 text-[11px] uppercase text-gray-400 dark:text-neutral-500">
                      Apr 06
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="w-full flex gap-x-5">
                  <span className="flex flex-shrink-0 justify-center items-center w-[38px] h-[38px] border border-gray-200 text-sm font-semibold uppercase text-gray-800 rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                    D
                  </span>

                  <div className="grow">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                      David Lidell
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Added a new member to Preline
                    </p>

                    <p className="mt-2 text-[11px] uppercase text-gray-400 dark:text-neutral-500">
                      May 15
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="w-full flex gap-x-5">
                  <img
                    className="flex-shrink-0 w-[38px] h-[38px] rounded-full"
                    src="https://images.unsplash.com/photo-1568048689711-5e0325cea8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                    alt="Image Description"
                  ></img>

                  <div className="grow">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                      Lana Robinson
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Added 2 files to task
                      <a
                        className="ms-1 align-middle inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
                        href="#"
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
                          <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                        </svg>
                        PR-7
                      </a>
                    </p>

                    <div className="mt-2 grid grid-cols-2 gap-x-2">
                      <div className="border border-gray-200 rounded-lg p-2 dark:border-neutral-700">
                        <div className="flex gap-x-2">
                          <svg
                            className="flex-shrink-0 w-6 h-6"
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
                            <path
                              d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                              fill="#107C41"
                            />
                            <path
                              d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                              fill="#33C481"
                            />
                            <path
                              d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                              fill="#185C37"
                            />
                            <path
                              d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                              fill="#107C41"
                            />
                            <path
                              opacity="0.1"
                              d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                            <path
                              opacity="0.2"
                              d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                            <path
                              opacity="0.2"
                              d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                            <path
                              opacity="0.2"
                              d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
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
                          <div className="grow truncate">
                            <p className="block truncate text-xs text-gray-800 dark:text-neutral-300">
                              weekly-reports.xls
                            </p>
                            <small className="block text-xs text-gray-400 dark:text-neutral-500">
                              4kb
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-2 dark:border-neutral-700">
                        <div className="flex gap-x-2">
                          <svg
                            className="flex-shrink-0 w-6 h-6"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                              fill="#41A5EE"
                            />
                            <path
                              d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                              fill="#2B7CD3"
                            />
                            <path
                              d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                              fill="#185ABD"
                            />
                            <path
                              d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                              fill="#103F91"
                            />
                            <path
                              opacity="0.1"
                              d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                            <path
                              opacity="0.2"
                              d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                            <path
                              opacity="0.2"
                              d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                            <path
                              opacity="0.2"
                              d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                              className="fill-black dark:fill-neutral-200"
                              fill="currentColor"
                            />
                            <path
                              d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                              fill="#185ABD"
                            />
                            <path
                              d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                              fill="white"
                            />
                          </svg>
                          <div className="grow truncate">
                            <p className="block truncate text-xs text-gray-800 dark:text-neutral-300">
                              monthly-reports.xls
                            </p>
                            <small className="block text-xs text-gray-400 dark:text-neutral-500">
                              12kb
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-2 text-[11px] uppercase text-gray-400 dark:text-neutral-500">
                      Now
                    </p>
                  </div>
                </div>
              </div>

              <div
                id="hs-pro-dnao-button"
                className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-pro-dnao"
              >
                <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                  <div className="w-full flex gap-x-5">
                    <span className="flex flex-shrink-0 justify-center items-center w-[38px] h-[38px] border border-gray-200 text-sm font-semibold uppercase text-gray-800 rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      D
                    </span>

                    <div className="grow">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                        David Lidell
                      </h4>

                      <p className="text-sm text-gray-500 dark:text-neutral-500">
                        Added a new member to Preline
                      </p>

                      <p className="mt-2 text-[11px] uppercase text-gray-400 dark:text-neutral-500">
                        May 15
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                  <div className="w-full flex gap-x-5">
                    <span className="flex flex-shrink-0 justify-center items-center w-[38px] h-[38px] border border-gray-200 text-sm font-semibold uppercase text-gray-800 rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </span>

                    <div className="grow">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-300">
                        Project status updated
                      </h4>

                      <p className="text-sm text-gray-500 dark:text-neutral-500">
                        Marked
                        <a
                          className="align-middle inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
                          href="#"
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
                            <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                          </svg>
                          PR-4
                        </a>
                        as
                        <span className="ms-0.5 inline-block align-middle py-1 px-1.5 bg-gray-100 text-xs font-medium text-gray-800 rounded-md dark:bg-neutral-700 dark:text-neutral-300">
                          In progress
                        </span>
                      </p>

                      <p className="mt-2 text-[11px] uppercase text-gray-400 dark:text-neutral-500">
                        Feb 10
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative last:pb-0 pb-8 last:after:hidden after:absolute after:top-[38px] after:bottom-0 after:start-[19px] after:w-px after:bg-gray-200 dark:after:bg-neutral-700">
                <button
                  type="button"
                  className="hs-collapse-toggle hs-collapse-open:hidden group w-full text-start flex items-center gap-x-5 focus:outline-none"
                  id="hs-pro-dnao"
                  data-hs-collapse="#hs-pro-dnao-button"
                >
                  <span className="w-[38px]">
                    <span className="flex flex-shrink-0 justify-center items-center w-6 h-7 border border-gray-200 text-sm font-semibold text-gray-800 rounded-md mx-auto dark:border-neutral-700 dark:text-neutral-400">
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
                        <path d="m7 15 5 5 5-5" />
                        <path d="m7 9 5-5 5 5" />
                      </svg>
                    </span>
                  </span>

                  <span className="grow">
                    <span className="text-sm font-semibold text-gray-800 group-focus:text-blue-600 dark:text-neutral-300 dark:group-focus:text-blue-500">
                      Show 2 more activities
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Navigation;
