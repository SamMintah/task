import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";

const useSearchQuery = (searchQuery) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const [matchedTasks, setMatchedTasks] = useState([]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    if (searchQuery.trim().length) {
      setMatchedTasks(filteredTasks);
    } else {
      setMatchedTasks([]);
    }
  }, [searchQuery, tasks]);

  return matchedTasks;
};

export default useSearchQuery;
