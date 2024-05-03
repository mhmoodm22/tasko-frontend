import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosCustom from "../../hooks/useAxiosCustom";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CommonButton from "../../components/CommonButton/CommonButton";
import taskIcon from "../../assets/images/task-icon.svg";
import StatusSelect from "../../components/Select/StatusSelect";
import Loader from "../../components/Loader/Loader";
import DeletePopUp from "../../components/PopUp/DeletePopUp";
import { useState } from "react";
import editIcon from "../../assets/images/edit-icon.svg";

const SingleTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosCustom = useAxiosCustom();
  const [isDeletePopUpActive, setIsDeletePopUpActive] = useState(false);
  // using query
  const { data: taskInfo, isLoading } = useQuery({
    queryKey: [id],

    queryFn: async () => {
      const res = await axiosCustom.get(`/task/${id}`);

      return res.data;
    },
  });

  const pending = "#E343E6";
  const progress = "#DD9221";
  const done = "#21D789";

  const currentColor =
    taskInfo?.status === "pending"
      ? pending
      : taskInfo?.status === "progress"
      ? progress
      : taskInfo?.status === "done"
      ? done
      : "";

  const statusText =
    taskInfo?.status === "pending"
      ? "Pending"
      : taskInfo?.status === "progress"
      ? "InProgress"
      : taskInfo?.status === "done"
      ? "Done"
      : "";

  return (
    <div className="h-full">
      {isLoading ? (
        <Loader />
      ) : (
        taskInfo.id && (
          // Task Wrapper
          <div className="flex flex-col h-full">
            {/* top part */}
            <div className="flex items-center justify-between pb-10 border-b-[1px] border-solid border-[#E1E1E1]">
              <SectionHeading>Task Details </SectionHeading>

              {/* top-left part */}
              <div className="flex items-center gap-[60px] ">
                {/* points */}
                <p
                  style={{
                    color: currentColor,
                  }}
                  className="text-base font-semibold "
                >
                  {" "}
                  {taskInfo?.point} Points{" "}
                </p>
                {/* buttons area */}
                <div className="flex items-center gap-4">
                  <div className="w-[145px]">
                    <CommonButton
                      icon={editIcon}
                      text={"Edit Task"}
                      color="#FFAB00"
                      bGcolor="rgba(255, 171, 0, 0.10)"
                    ></CommonButton>
                  </div>
                  <div className="w-[145px]" onClick={() => navigate(-1)}>
                    <CommonButton text={"Back"}></CommonButton>
                  </div>
                </div>
              </div>
            </div>

            {/* hero section */}
            <div className="pt-10 flex items-start gap-6 flex-grow ">
              {/* icon area */}
              <div className="min-w-[120px] h-[120px] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={taskIcon}
                  alt=""
                />
              </div>
              {/* details area */}
              <div>
                {/* title */}
                <h3 className="text-[30px] leading-[40px] font-semibold text-headingColor ">
                  {" "}
                  {taskInfo.title}{" "}
                </h3>
                {/* description */}
                <p className="text-[17px] text-paraLight leading-[30px]">
                  {" "}
                  {taskInfo.description}{" "}
                </p>

                {/* task info area */}
                <div className="pt-16 flex items-center gap-10">
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
                        {taskInfo.date}{" "}
                      </p>
                    </div>
                  </div>
                  {/* collaboration area */}
                  {taskInfo.collaborator ? (
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
                  <div className="flex items-center gap-4">
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
              </div>
            </div>

            <DeletePopUp
              isActive={isDeletePopUpActive}
              setIsActive={setIsDeletePopUpActive}
            />

            {/* task edit area */}
            <div className="flex items-center justify-between">
              {/* status change area */}
              <div>
                <p className="text-base text-headingColor font-semibold leading-5 pb-2">
                  Change Status
                </p>
                <StatusSelect></StatusSelect>
              </div>

              {/* button area */}
              <div className="flex items-center gap-5">
                {/* delete task */}
                <div
                  onClick={() => setIsDeletePopUpActive(true)}
                  className="w-[270px]"
                >
                  <CommonButton
                    text={"Delete Task"}
                    bGcolor="rgba(255, 76, 36, 0.15)"
                    color="#FF4C24"
                  ></CommonButton>
                </div>
                {/* submit task */}
                <div className="w-[270px]">
                  <CommonButton text={"Submit"}></CommonButton>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SingleTask;
