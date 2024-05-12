import { useEffect, useState } from "react";
import Task from "./Task";
import { useQuery } from "@tanstack/react-query";
import NoTask from "./NoTask";
import Loader from "../../Loader/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuthContext from "../../../hooks/useAuthContext";
import PropTypes from "prop-types";

function TaskList({ selectedCategory, selectedStatus }) {
  const [taskList, setTaskList] = useState([]);

  const { user } = useAuthContext();

  const axiosSecure = useAxiosSecure();

  // console.log(selectedCategory);
  // console.log(selectedStatus);

  // getting all the tasks
  const { data, isLoading } = useQuery({
    queryKey: ["mainTasks", selectedCategory, selectedStatus],

    queryFn: async () => {
      if (selectedCategory) {
        const res = await axiosSecure.get(
          `/tasks/category?category=${selectedCategory.catName}&userID=${user.userId}`
        );

        return res.data;
      } else if (selectedStatus) {
        if (selectedStatus.statusTitle === "All Task") {
          const res = await axiosSecure.get(`/tasks?userID=${user.userId}`);

          return res.data;
        } else {
          const res = await axiosSecure.get(
            `/tasks/status?status=${selectedStatus.statusTitle}&userID=${user.userId}`
          );

          return res.data;
        }
      } else {
        const res = await axiosSecure.get(`/tasks?userID=${user.userId}`);

        return res.data;
      }
    },
  });

  useEffect(() => {
    // saving the data in the state
    setTaskList(data);
  }, [data]);

  // console.log(data);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        taskList && (
          <div>
            {taskList?.length > 0 ? (
              // Use cached taskList if available
              <div className="grid grid-cols-1 2xl:grid-cols-3 gap-3 lg:gap-6">
                {taskList.map((singleTask, index) => (
                  <Task taskInfo={singleTask} key={index} />
                ))}
              </div>
            ) : (
              <NoTask /> // Show "No Task" if data is truly empty
            )}
          </div>
        )
      )}
    </div>
  );
}

export default TaskList;

TaskList.propTypes = {
  selectedCategory: PropTypes.object,
  selectedStatus: PropTypes.object,
};
