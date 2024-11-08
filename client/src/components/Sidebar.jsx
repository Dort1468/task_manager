import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { setOpenSidebar } from "../redux/slices/authSlice";

const linkData = [
  {
    label: "主頁",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "任務",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "已完成",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "進行中",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "尚未開始",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "團隊",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "回收桶",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 fap-2 px-3 py-2 rounded-lg items-center text-gray-800 text-base hover:bg-[#737373]",
          path === el.link.split("/")[0] ? "bg-[#404040] text-white" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-white font-semibold text-xl">
          {el.label}
        </span>
      </Link>
    );
  };
  return (
    <div className="w-full h-full flex flex-col fap-6 p-5 bg-[#cccccc]">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">Taskon</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className="">
        {/* <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800">
          <MdSettings />
          <span>Settings</span>
        </button> */}
      </div>
    </div>
  );
};

export default Sidebar;
