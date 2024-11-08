import React, { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";

const TABS = [
  { title: "看板模式", icon: <MdGridView /> },
  { title: "條列式", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-[#ff3333]",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const status = params?.status || "";
  const { data, isLoading } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  const tasks = data?.tasks || [];
  // useEffect(() => {
  //   if (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  //   if (data) {
  //     console.log("Tasks loaded successfully:", {
  //       count: tasks.length,
  //       status: status,
  //     });
  //   }
  // }, [data, error, status]);

  useEffect(() => {
    console.log("Tasks data changed:", {
      hasData: !!data,
      tasks: data?.tasks,
      tasksLength: data?.tasks?.length,
    });
  }, [data]);

  useEffect(() => {
    console.log("Current View:", selected === 0 ? "Board View" : "List View");
    console.log("Tasks data", data?.tasks);
  }, [selected, data]);

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status}` : "Task"} />
        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="新增任務"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse fap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      {/* testing  */}
      {/* <div className="mb-4">
        <button
          onClick={() => setSelected(0)}
          className={`mr-4 ${selected === 0 ? "text-blue-600" : ""}`}
        >
          Board View
        </button>
        <button
          onClick={() => setSelected(1)}
          className={`${selected === 1 ? "text-blue-600" : ""}`}
        >
          List View
        </button>
      </div> */}

      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div>
              <TaskTitle label="未完成" className={TASK_TYPE.todo} />
              <TaskTitle label="進行中" className={TASK_TYPE["in progress"]} />
              <TaskTitle label="已完成" className={TASK_TYPE.completed} />
            </div>
          )}

          <div tasks={data?.tasks} />
        </Tabs>

        <AddTask open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Tasks;
