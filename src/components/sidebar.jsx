import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OverviewIcon from "../assets/images/sidebar/overview";
import CustomerIcon from "../assets/images/sidebar/customer";
import { ManageIcon } from "../assets/images/sidebar/manage";
import WithdrawalIcon from "../assets/images/sidebar/withdrawal";
import TransactionIcon from "../assets/images/sidebar/transactionIcon";
import SuperAdmin from "../assets/images/sidebar/super";
import SupportIcon from "../assets/images/sidebar/support";
import cliqIcon from "../assets/images/admin/cliqIcon.png";

import Mode from "../assets/images/sidebar/mode";
import SunIcon from "../assets/images/ColorMode/sun.svg";
import checkIcon from "../assets/images/logo.png";
import LockIcon from "@mui/icons-material/Lock";
export const Sidebar = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const [theme, setTheme] = useState("dark");
  const mainMenu = [
    {
      name: "Student",
      component: <SuperAdmin isRightLink={location === "/students"} />,
      link: "students",
    },
    {
      name: "Transactions",
      component: <TransactionIcon isRightLink={location === "/transaction"} />,
      link: "transaction",
    },
    {
      name: "Manage Bills",
      component: <ManageIcon isRightLink={location === "/manage-bills"} />,
      link: "manage-bills",
    },
    {
      name: "Withdrawal",
      component: <WithdrawalIcon isRightLink={location === "/withdrawal"} />,
      link: "withdrawal",
    },
  ];
  const adminMenu = [
    {
      name: "Administrator",
      component: <SuperAdmin isRightLink={location === "/super-admin"} />,
      link: "super-admin",
    },
    {
      name: "Support",
      component: <SupportIcon isRightLink={location === "/support"} />,
      link: "support",
    },
    {
      name: "Reset Password",
      component: <LockIcon isRightLink={location === "/reset"} />,
      link: "reset",
    },
  ];
  const systemMenu = [
    {
      name: "DarkMode",
      component: <SuperAdmin isRightLink={location === "/super-admin"} />,
      link: "super-admin",
    },
    {
      name: "Support",
      component: <SupportIcon isRightLink={location === "/support"} />,
      link: "support",
    },
  ];
  function logOut() {
    navigate("/");
    localStorage.clear();
  }
  return (
    <aside className="flex h-full pl-[2em] py-[3em]  border-r border-border_light pr-[1em] flex-col bg-white">
      <img src={cliqIcon} className="w-[100px] mt-[-40px] " alt="check icon" />

      <div className="pt-5 pb-3  border-b border-solid ">
        <div
          className={`${
            location === "/overview"
              ? "bg-brown_1 text-white"
              : "bg-transparent text-grey_2"
          } p-2 w-full  rounded-[10px]`}
        >
          <Link to="/overview" className="flex flex-row items-center gap-2 ">
            <OverviewIcon isOverview={location === "/overview"} />
            Overview
          </Link>
        </div>
      </div>

      <div className="pt-5 pb-3 flex flex-col gap-4  text-grey_2 border-b border-solid ">
        <span className=" font-normal">MAIN MENU</span>
        <div>
          {mainMenu.map((item) => {
            return (
              <div
                key={item.name}
                className={`${
                  location === `/${item.link}`
                    ? "bg-brown_1 text-white"
                    : "bg-transparent text-grey_2"
                } p-2 w-full mb-2  rounded-[10px]`}
              >
                <Link
                  to={`/${item.link}`}
                  className="flex flex-row items-center gap-2  font-normal"
                >
                  {item.component}
                  {item.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-5 pb-3 flex flex-col gap-4 text-grey_2  border-b border-solid ">
        <span className=" font-normal">ADMINISTRATOR</span>
        <div>
          {adminMenu.map((item) => {
            return (
              <div
                key={item.name}
                className={`${
                  location === `/${item.link}`
                    ? "bg-brown_1 text-white"
                    : "bg-transparent text-grey_2"
                } p-2 w-full mb-2 rounded-[10px]`}
              >
                <Link
                  to={`/${item.link}`}
                  className="flex flex-row items-center gap-2  font-normal"
                >
                  {item.component}
                  {item.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-5 pb-3 flex flex-col gap-4 text-grey_2  border-b border-solid ">
        <span className="">SYSTEM MENU</span>
        <div>
          <div className="flex items-center justify-between ">
            <div className="text-grey_2 mb-2 items-center gap-2 flex p-2 w-full  rounded-[10px]">
              <Mode />
              <span className=" font-normal">Dark Theme</span>
            </div>

            <div
              className="hover:shadow-lg  min-h-[30px] flex flex-row items-center w-fit p-1 cursor-pointer gap-2 bg-light_cards dark:bg-dark_cards rounded-[30px] border border-grey_2 dark:border-dark_separator"
              // onClick={changeMode}
            >
              <img
                src={SunIcon}
                className={`cursor-pointer h-[20px] ${
                  theme === "dark"
                    ? "bg-brown_1 dark:bg-dark_primary p-2 rounded-[50%]"
                    : ""
                }`}
              />
              <svg
                className={`cursor-pointer h-[20px] ${
                  !theme === "dark"
                    ? "bg-light_primary dark:bg-dark_primary p-3 rounded-[50%]"
                    : ""
                }`}
                width={theme === "dark" ? "24" : "44"}
                height={theme === "dark" ? "24" : "44"}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.03009 12.42C2.39009 17.57 6.76009 21.76 11.9901 21.99C15.6801 22.15 18.9801 20.43 20.9601 17.72C21.7801 16.61 21.3401 15.87 19.9701 16.12C19.3001 16.24 18.6101 16.29 17.8901 16.26C13.0001 16.06 9.00009 11.97 8.98009 7.13996C8.97009 5.83996 9.24009 4.60996 9.73009 3.48996C10.2701 2.24996 9.62009 1.65996 8.37009 2.18996C4.41009 3.85996 1.70009 7.84996 2.03009 12.42Z"
                  stroke={theme === "dark" ? "#3E3E3E" : "#FFFFFF"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={logOut}
            className="text-grey_2 items-center gap-2 flex p-2 w-full  rounded-[10px]"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.325 16.275C15.1417 16.0583 15.05 15.8125 15.05 15.5375C15.05 15.2625 15.1417 15.0333 15.325 14.85L17.175 13H10C9.71667 13 9.47917 12.9042 9.2875 12.7125C9.09583 12.5208 9 12.2833 9 12C9 11.7167 9.09583 11.4792 9.2875 11.2875C9.47917 11.0958 9.71667 11 10 11H17.175L15.325 9.15C15.125 8.95 15.025 8.7125 15.025 8.4375C15.025 8.1625 15.125 7.925 15.325 7.725C15.5083 7.525 15.7375 7.425 16.0125 7.425C16.2875 7.425 16.5167 7.51667 16.7 7.7L20.3 11.3C20.4 11.4 20.4708 11.5083 20.5125 11.625C20.5542 11.7417 20.575 11.8667 20.575 12C20.575 12.1333 20.5542 12.2583 20.5125 12.375C20.4708 12.4917 20.4 12.6 20.3 12.7L16.7 16.3C16.4833 16.5167 16.2458 16.6125 15.9875 16.5875C15.7292 16.5625 15.5083 16.4583 15.325 16.275ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H11C11.2833 3 11.5208 3.09583 11.7125 3.2875C11.9042 3.47917 12 3.71667 12 4C12 4.28333 11.9042 4.52083 11.7125 4.7125C11.5208 4.90417 11.2833 5 11 5H5V19H11C11.2833 19 11.5208 19.0958 11.7125 19.2875C11.9042 19.4792 12 19.7167 12 20C12 20.2833 11.9042 20.5208 11.7125 20.7125C11.5208 20.9042 11.2833 21 11 21H5Z"
                fill="#D40000"
              />
            </svg>
            <span className=" ">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
