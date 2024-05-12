import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CommonButton from "../../components/CommonButton/CommonButton";
import taskIcon from "../../assets/images/task-icon.svg";
import StatusSelect from "../../components/Select/StatusSelect";
import Loader from "../../components/Loader/Loader";
import DeletePopUp from "../../components/PopUp/DeletePopUp";
import { useEffect, useState } from "react";
import CongratsPopUp from "../../components/PopUp/CongratsPopUp";
import NoContent from "../../components/NoContent/NoContent";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import moment from "moment";
import toast from "react-hot-toast";
import useAuthContext from "../../hooks/useAuthContext";

const SingleTask = () => {
  const { id } = useParams();

  const { user, setCustomUserRefetch } = useAuthContext();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isDeletePopUpActive, setIsDeletePopUpActive] = useState(false);
  const [isSubmitPopUP, setSubmitPopUP] = useState(false);
  // eslint-disable-next-line
  const [selectedStatus, setSelectedStatus] = useState(null);

  console.log(selectedStatus);

  const [deleteTask, setDeleteTask] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // using query
  const {
    data: taskInfo,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [id],

    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/getTaskDetail?taskID=${id}`);

      return res.data;
    },
  });

  console.log(taskInfo);

  const pending = "#E343E6";
  const progress = "#DD9221";
  const done = "#21D789";

  const currentColor =
    taskInfo?.status.toLowerCase() === "pending"
      ? pending
      : taskInfo?.status.toLowerCase() === "ongoing"
      ? progress
      : taskInfo?.status.toLowerCase() === "done"
      ? done
      : "";

  const statusText =
    taskInfo?.status.toLowerCase() === "pending"
      ? "Pending"
      : taskInfo?.status.toLowerCase() === "ongoing"
      ? "InProgress"
      : taskInfo?.status.toLowerCase() === "done"
      ? "Done"
      : "";

  // deleting task
  useEffect(() => {
    if (confirmDelete && deleteTask) {
      axiosSecure
        .delete(`/tasks/deleteTask?taskID=${deleteTask}`)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Task Deleted Successfully");
            navigate("/");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }

    // eslint-disable-next-line
  }, [confirmDelete, deleteTask]);

  // handle submit task
  const handleSubmitTask = () => {
    if (selectedStatus) {
      axiosSecure
        .put(
          `tasks/updateStatus?status=${selectedStatus.statusTitle}&taskID=${id}&userID=${user.userId}`
        )
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status === "Done") {
              setSubmitPopUP(true);
              setCustomUserRefetch(true);
            } else {
              toast.success("Task Status Updated");
            }
            refetch();
          }
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <div className="h-full">
      {isLoading ? (
        <Loader />
      ) : taskInfo.taskId ? (
        // Task Wrapper
        <div className="flex flex-col h-full overflow-y-auto no--scrollbar">
          {/* top part */}
          <div className="flex items-start justify-between pb-4 lg:pb-10 border-b-[1px] border-solid border-[#E1E1E1] flex-col lg:flex-row gap-5 relative lg:gap-0  lg:items-center">
            <SectionHeading>Task Details </SectionHeading>

            {/* top-left part */}
            <div className="flex items-center lg:gap-[60px] w-full md:w-fit">
              {/* points */}
              <p
                style={{
                  color: currentColor,
                }}
                className="text-base font-semibold absolute top-0 right-0 lg:relative "
              >
                {" "}
                {taskInfo?.point} Points{" "}
              </p>
              {/* buttons area */}
              <div className="flex items-center gap-4 w-full lg:w-fit ">
                <div
                  className=" w-full md:w-[145px]"
                  onClick={() => navigate(-1)}
                >
                  <CommonButton text={"Back"}></CommonButton>
                </div>
              </div>
            </div>
          </div>

          {/* hero section */}
          <div className=" pt-5 lg:pt-10 flex items-start gap-3 lg:gap-6 flex-grow flex-col lg:flex-row ">
            {/* icon area */}
            <div className=" min-w-[60px] h-[60px]  max-w-[60px] md:min-w-[120px] md:max-w-[120px] md:h-[120px] overflow-hidden">
              <img
                className="w-full h-full object-contain md:object-cover"
                src={taskIcon}
                alt=""
              />
            </div>
            {/* details area */}
            <div className="">
              {/* title */}
              <h3 className=" text-[24px] leading-6  lg:text-[30px] lg:leading-[40px] font-semibold text-headingColor ">
                {" "}
                {taskInfo.title}{" "}
              </h3>
              {/* description */}
              <p className=" text-sm lg:text-[17px] text-paraLight leading-6 w-full lg:leading-[30px] pt-3">
                {" "}
                {taskInfo.description}{" "}
              </p>

              {/* task info area */}
              <div className="pt-16  items-center gap-10 flex flex-col  lg:flex-row ">
                {/* date area */}
                <div>
                  <p className="pb-4 text-[18px] font-semibold">End Date</p>

                  {/* value */}
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      className="w-9 h-9"
                    >
                      <path
                        d="M11.7812 2.94507V7.36265"
                        stroke="#1F1F1F"
                        strokeWidth="2.20879"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23.5625 2.94507V7.36265"
                        stroke="#1F1F1F"
                        strokeWidth="2.20879"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.15625 13.3853H30.1892"
                        stroke="#1F1F1F"
                        strokeWidth="2.20879"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M28.2837 23.2218L23.071 28.4345C22.8648 28.6407 22.6733 29.0235 22.6292 29.3033L22.3494 31.2912C22.2463 32.0128 22.747 32.5134 23.4685 32.4104L25.4564 32.1306C25.7362 32.0864 26.1338 31.895 26.3252 31.6888L31.538 26.4761C32.4362 25.5778 32.8633 24.5323 31.538 23.2071C30.2274 21.8965 29.1819 22.3235 28.2837 23.2218Z"
                        stroke="#1F1F1F"
                        strokeWidth="2.20879"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.5391 23.9727C27.9808 25.5631 29.2177 26.8 30.8081 27.2418"
                        stroke="#1F1F1F"
                        strokeWidth="2.20879"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.6668 32.3956H11.7767C6.62285 32.3956 4.41406 29.4505 4.41406 25.033V12.5165C4.41406 8.09889 6.62285 5.15384 11.7767 5.15384H23.5569C28.7108 5.15384 30.9196 8.09889 30.9196 12.5165V17.6703"
                        stroke="#1F1F1F"
                        strokeWidth="2.20879"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.6657 20.1736H17.6789"
                        stroke="#1F1F1F"
                        strokeWidth="2.94506"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.2126 20.1736H12.2258"
                        stroke="#1F1F1F"
                        strokeWidth="2.94506"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.2126 24.5912H12.2258"
                        stroke="#1F1F1F"
                        strokeWidth="2.94506"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-xl text-[#1F1F1F] leading-[33px]">
                      {" "}
                      {moment(taskInfo.date).format("dddd, MMMM D - YYYY")}{" "}
                    </p>
                  </div>
                </div>
                {/* collaboration area */}
                {taskInfo.isCollaborator ? (
                  <div className="border-l border-solid border-[#E1E1E1] px-10 border-r">
                    <p className="pb-4 text-[18px] font-semibold">
                      Assigned Friends
                    </p>

                    {/* profile */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={taskInfo?.collaborator?.profile_img}
                          alt=""
                        />
                      </div>
                      <p className="text-xl leading-[33px] text-headingColor">
                        {" "}
                        {taskInfo.collaborator.profile_name}{" "}
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* task status */}
                <div className="flex items-center gap-4 border-l-2  pl-10">
                  <p
                    style={{
                      backgroundColor: currentColor,
                    }}
                    className="w-3 h-3 rounded-full"
                  ></p>
                  <p
                    style={{
                      color: currentColor,
                    }}
                    className="text-[24px] leading-[52px] font-medium"
                  >
                    {" "}
                    {statusText}{" "}
                  </p>
                </div>
              </div>

              {/* status change area */}
              {taskInfo.status === "Done" ? (
                ""
              ) : (
                <div className="pt-16 w-fit hidden lg:block">
                  <p className="text-base text-headingColor font-semibold leading-5 pb-2">
                    Change Status
                  </p>
                  <div className="w-[410px]">
                    <StatusSelect
                      selectedStatus={selectedStatus}
                      setSelectedValue={setSelectedStatus}
                    ></StatusSelect>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* task edit area */}
          <div className="flex items-center flex-col lg:flex-row ">
            {/* status change area */}
            {taskInfo.status === "Done" ? (
              ""
            ) : (
              <div className=" pt-4 pb-4 lg:pb-0 lg:pt-16 w-full lg:w-fit lg:hidden ">
                <p className="text-base text-headingColor font-semibold leading-5 pb-2">
                  Change Status
                </p>

                <div className="w-full lg:w-[410px]">
                  <StatusSelect
                    selectedStatus={selectedStatus}
                    setSelectedValue={setSelectedStatus}
                  ></StatusSelect>
                </div>
              </div>
            )}
            {/* button area */}
            <div className="flex items-center gap-3  pt-2 lg:pt-0 lg:gap-5 ml-auto flex-col lg:flex-row w-full lg:w-fit">
              {/* delete task */}
              <div
                onClick={() => {
                  setIsDeletePopUpActive(true);
                  setDeleteTask(taskInfo.taskId);
                }}
                className=" w-full lg:w-[270px]"
              >
                <CommonButton
                  text={"Delete Task"}
                  bGcolor="rgba(255, 76, 36, 0.15)"
                  color="#FF4C24"
                ></CommonButton>
              </div>
              {/* submit task */}
              <div
                onClick={() => handleSubmitTask()}
                className=" w-full lg:w-[270px]"
              >
                <CommonButton text={"Submit"}></CommonButton>
              </div>
            </div>
          </div>

          <DeletePopUp
            isActive={isDeletePopUpActive}
            setIsActive={setIsDeletePopUpActive}
            setConfirm={setConfirmDelete}
          />

          <CongratsPopUp
            isActive={isSubmitPopUP}
            setIsActive={setSubmitPopUP}
            mainText={"Successfully Completed the Task!"}
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <NoContent />
        </div>
      )}
    </div>
  );
};

export default SingleTask;
