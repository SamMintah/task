import React from "react";
import LayoutRoutes from "../utilities/LayoutRoutes";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";

const Home = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  useDescriptionTitle("Organize your tasks", "All tasks");

  return <LayoutRoutes title="All tasks" tasks={tasks}></LayoutRoutes>;
};

export default Home;
