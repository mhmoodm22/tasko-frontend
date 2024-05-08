import { useEffect, useState } from "react";
import useAxiosCustom from "../../../hooks/useAxiosCustom";
import Task from "./Task";
import { useQuery } from "@tanstack/react-query";
import NoTask from "./NoTask";
import Loader from "../../Loader/Loader";

function TaskList() {
  const [taskList, setTaskList] = useState([]);

  const axiosCustom = useAxiosCustom();

  // using query
  const { data, isLoading } = useQuery({
    queryKey: ["mainTasks"],

    queryFn: async () => {
      const res = await axiosCustom.get("/all-tasks");

      return res.data;
    },
  });

  useEffect(() => {
    // saving the data in the state
    setTaskList(data);
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {taskList?.length > 0 ? (
            // Use cached taskList if available
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-3 lg:gap-6">
              {data.map((singleTask, index) => (
                <Task taskInfo={singleTask} key={index} />
              ))}
            </div>
          ) : (
            <NoTask /> // Show "No Task" if data is truly empty
          )}
        </div>
      )}
    </div>
  );
}

export default TaskList;
