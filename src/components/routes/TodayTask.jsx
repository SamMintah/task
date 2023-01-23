import React from "react";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import useTodayTasks from "../hooks/useTodayTasks";
import LayoutRoutes from "../utilities/LayoutRoutes";

const TodaysTasks = () => {
  const todaysTasks = useTodayTasks();

  useDescriptionTitle("Today's tasks", "Today's tasks");

  return (
    <LayoutRoutes title="Today's tasks" tasks={todaysTasks}></LayoutRoutes>
  );
};

export default TodaysTasks;
