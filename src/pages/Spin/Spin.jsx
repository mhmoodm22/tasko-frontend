import { SpinWheel } from "spin-wheel-game";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import "./Spin.css";
import { useEffect, useState } from "react";
import CategorySelect from "../../components/Select/CategorySelect";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../hooks/useAuthContext";
import Loader from "../../components/Loader/Loader";
import CommonButton from "../../components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import NoContent from "../../components/NoContent/NoContent";

const Spin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();

  const [allTask, setAllTask] = useState(null);
  const [taskSegments, setTaskSegments] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  // generating random colors for spinner
  function generateRandomColor() {
    // Generate random hex color code
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["allSpinTask"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks?userID=${user.userId}`);

      return res.data;
    },
  });

  useEffect(() => {
    setAllTask(data);
  }, [data]);

  // setting the all task into segement format
  useEffect(() => {
    if (allTask) {
      const taskSegments = allTask.map((item) => {
        return {
          segmentText: item.title,
          segColor: generateRandomColor(),
          taskId: item.taskId,
        };
      });

      setTaskSegments(taskSegments);
    }
  }, [allTask]);

  const [showInstruction, setShowInstruction] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);

  // function to handle finish
  const handleSpinFinish = (result) => {
    console.log(`Spun to: ${result}`);

    // finding the selected task
    const choosen = allTask.find((item) => item.title === result);

    setSelectedTask(choosen);

    // Handle the result as needed
    setShowInstruction(false);
    setSelectedResult(result);
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const spinWheelProps = {
    onFinished: handleSpinFinish,
    primaryColor: "black",
    contrastColor: "#fff",
    buttonText: "Spin",
    isOnlyOnce: false,
    size: 290,
    upDuration: 100,
    downDuration: 600,
    fontFamily: "'Poppins', sans-serif",
    arrowLocation: "bottom",
    showTextOnSpin: false,
    isSpinSound: false,
  };

  console.log(taskSegments);
  return (
    <div>
      {/* top part */}
      <div className="flex items-center justify-between flex-col lg:flex-row w-full gap-5 lg:gap-0">
        <SectionHeading>Spin Wheel</SectionHeading>

        {/* task category selection */}
        <div className="w-full lg:w-fit">
          <p className="text-headingColor text-base font-semibold leading-5 pb-3 ">
            Select Task Category
          </p>
          <div className=" w-full lg:w-[305px]">
            <CategorySelect
              selectedCategory={selectedCategory}
              setCategoryValue={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* spinner */}

      {isLoading ? (
        <Loader />
      ) : taskSegments && taskSegments.length > 0 ? (
        taskSegments.length < 2 ? (
          // checking if the user has more than 2 task
          <NoContent text="You have to add at least 3 task for the Spin" />
        ) : (
          <div>
            <div className="w-[300px]  lg:w-[500px] mx-auto mt-6 lg:mt-0">
              <SpinWheel
                key={taskSegments.length}
                {...spinWheelProps}
                segments={taskSegments}
              />
            </div>

            {/* selected text */}
            {selectedResult && (
              <div>
                <p className="text-center py-6 text-xl lg:text-2xl font-semibold text-primaryColor ">
                  {selectedResult}
                </p>

                <div
                  onClick={() => navigate(`/task/${selectedTask.taskId}`)}
                  className="w-[270px] mx-auto"
                >
                  <CommonButton text={"Go To Task"} />
                </div>
              </div>
            )}

            {/* instruction text */}
            {showInstruction && (
              <p className="text-center text-headingColor font-semibold leading-5 text-base py-3">
                Spin Wheel to pick your task
              </p>
            )}
          </div>
        )
      ) : (
        <NoContent text="No Task avilable for this feature" />
      )}
    </div>
  );
};

export default Spin;
