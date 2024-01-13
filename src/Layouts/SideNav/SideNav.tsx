import { ReactElement } from "react";
import { AiOutlineExport } from "react-icons/ai";
import { BsFileEarmarkSpreadsheet, BsFillFileEarmarkPostFill } from "react-icons/bs";
import { MdAttachMoney, MdManageAccounts, MdPayment } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { Link } from "react-router-dom";
// import styles from "./SideNav.module.scss";

const SideNav = (): ReactElement => {
  return (
    <>
      <aside>
        <div>
          <ul>
            <li>
              <div>
                <Link to="/files">
                  <BsFileEarmarkSpreadsheet />
                  <span>Files</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/exports">
                  <AiOutlineExport />
                  <span>Exports</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/analytics">
                  <SlGraph />
                  <span>Analytics</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/posts">
                  <BsFillFileEarmarkPostFill />
                  <span>Posts</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/premium">
                  <MdAttachMoney />
                  <span>Premium</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/account">
                  <MdManageAccounts />
                  <span>Account</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/organization">
                  <MdManageAccounts />
                  <span>Organization</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/billing">
                  <MdPayment />
                  <span>Billing</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
    // <>
    //   {/* <aside className={styles.sidenav}> */}
    //   <aside className="bg-slate-400 fixed top-0 w-[12%] h-full flex justify-center">
    //     {/* <div className={styles.sidenav__content}> */}
    //     <div className="pt-24">
    //       <ul>
    //         <li>
    //           <div>
    //             <Link to="/files" className="flex items-center p-2">
    //               <BsFileEarmarkSpreadsheet className="mr-2" />
    //               <span>Files</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/exports" className="flex items-center p-2">
    //               <AiOutlineExport className="mr-2" />
    //               <span>Exports</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/analytics" className="flex items-center p-2">
    //               <SlGraph className="mr-2" />
    //               <span>Analytics</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/posts" className="flex items-center p-2">
    //               <BsFillFileEarmarkPostFill className="mr-2" />
    //               <span>Posts</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/premium" className="flex items-center p-2">
    //               <MdAttachMoney className="mr-2" />
    //               <span>Premium</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/account" className="flex items-center p-2">
    //               <MdManageAccounts className="mr-2" />
    //               <span>Account</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/organization" className="flex items-center p-2">
    //               <MdManageAccounts className="mr-2" />
    //               <span>Organization</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/billing" className="flex items-center p-2">
    //               <MdPayment className="mr-2" />
    //               <span>Billing</span>
    //             </Link>
    //           </div>
    //         </li>
    //       </ul>
    //     </div>
    //   </aside>
    //   {/* <div className={styles.sidenav}>

    //     <div className={styles["sidenav__content"]}>

    //       <ul>
    //         <li>
    //           <div>
    //             <Link to="/files">
    //               <BsFileEarmarkSpreadsheet />
    //               <span>Files</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/exports">
    //               <AiOutlineExport />
    //               <span>Exports</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/analytics">
    //               <SlGraph />
    //               <span>Analytics</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/account">
    //               <MdManageAccounts />
    //               <span>Account</span>
    //             </Link>
    //           </div>
    //         </li>
    //         <li>
    //           <div>
    //             <Link to="/posts">
    //               <MdManageAccounts />
    //               <span>Posts</span>
    //             </Link>
    //           </div>
    //         </li>
    //       </ul>
    //     </div>
    //   </div> */}

    //   {/* <Outlet /> */}
    // </>
  );
};

export default SideNav;
