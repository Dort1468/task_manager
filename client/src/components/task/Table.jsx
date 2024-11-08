import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { BGS, PRIORITYSTYLE, TASK_TYPE, formatDate } from "../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmationDialog from "../Dialog";
import { useEffect } from "react";
import { useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice";
import AddTask from "./AddTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [trashTask] = useTrashTaskMutation();

  const validTasks = Array.isArray(tasks) ? tasks : [];

  // if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
  //   console.log("No tasks condition triggered:", {
  //     tasks: tasks,
  //     isArray: Array.isArray(tasks),
  //     length: tasks?.length,
  //   });

  //   return (
  //     <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
  //       <p className="text-center text-gray-500">No tasks available</p>
  //     </div>
  //   );
  // }

  // useEffect(() => {
  //   if (!Array.isArray(tasks)) {
  //     console.warn("Table component received invalid tasks prop:", tasks);
  //   }
  // }, [tasks]);

  // useEffect(() => {
  //   console.log("tasks data:", tasks);
  // }, [tasks]);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editTaskHandler = (el) => {
    setSelected(el);
    setOpenEdit(true);
  };

  const deleteHandler = async () => {
    try {
      const result = await trashTask({
        id: selected,
        isTrashed: "trash",
      }).unwrap();

      toast.success(result?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-black  text-left">
        <th className="py-2">任務名稱</th>
        <th className="py-2">優先度</th>
        <th className="py-2 line-clamp-1">創建於</th>
        <th className="py-2">狀態</th>
        <th className="py-2">成員</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className="w-full line-clamp-2 text-base text-black">
            {task?.title}
          </p>
        </div>
      </td>

      <td className="py-2">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIORITYSTYLE[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="capitalize line-clamp-1">{task?.priority}</span>
        </div>
      </td>

      <td className="py-2">
        <span className="text-sm text-gray-600">
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className="py-2">
        <div className="flex">
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="py-2 flex gap-2 md:gap-4 justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
          label="編輯"
          type="button"
          onClick={() => editTaskHandler(task)}
        />

        <Button
          className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
          label="刪除"
          type="button"
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

  if (validTasks.length === 0) {
    return (
      <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <p className="text-center text-gray-500">目前沒有任務</p>
      </div>
    );
  }
  return (
    <>
      <div className="bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full ">
            <TableHeader />
            <tbody>
              {validTasks.map((task, index) => (
                <TableRow key={task?._id || index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO */}
      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />
    </>
  );
};

export default Table;
