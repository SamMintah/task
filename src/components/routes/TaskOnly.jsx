import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import LayoutRoutes from "../utilities/LayoutRoutes";

const TaskOnly = () => {
  const params = useParams();
  const navigate = useNavigate();

  const tasks = useAppSelector((store) => store.tasks.tasks);

  const [matchedTask, setMatchedTask] = useState([]);

  useEffect(() => {
    const taskId = params.taskId;
    const filteredTask = tasks.filter((task) => taskId === task.id);
    if (!filteredTask.length) {
      navigate("/");
    }
    setMatchedTask(filteredTask);
  }, [navigate, params.taskId, tasks]);

  const title = matchedTask.length ? matchedTask[0].title : "";

  useDescriptionTitle(`Searching for ${title}`, "Task " + title);

  return <LayoutRoutes title={title} tasks={matchedTask} />;
};

export default TaskOnly;
