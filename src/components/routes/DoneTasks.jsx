import React from "react";
import { useAppSelector } from "../../store/hooks";
import useCompletedTasks from "../hooks/useCompletedTask";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../utilities/LayoutRoutes";

const DoneTasks= ({
  done,
  title,
}) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const { tasks: tasksFiltered } = useCompletedTasks({ tasks, done });

  useDescriptionTitle("All tasks done", title);

  return <LayoutRoutes title={title} tasks={tasksFiltered}></LayoutRoutes>;
};

export default DoneTasks;
