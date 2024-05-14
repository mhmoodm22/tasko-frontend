import { useEffect, useState } from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CommonButton from "../../components/CommonButton/CommonButton";
import { Link } from "react-router-dom";
import AddFriendIcon from "../../assets/images/user-cirlce-add.svg";
import { useQuery } from "@tanstack/react-query";
import Task from "../../components/Home/Task/Task";
import Loader from "../../components/Loader/Loader";
import BackButton from "../../components/BackButton.jsx/BackButton";
import useAuthContext from "../../hooks/useAuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import defaultProfile from "../../assets/images/default-profile.png";
import NoContent from "../../components/NoContent/NoContent";

export default function CollaborativeTask() {
  const { user } = useAuthContext();

  // selecting the current friend on click
  const [selectedFriend, setSelectedFriend] = useState(null);

  // list of collaborating tasks with each of the friends
  const [collaborativeTasks, setCollaborativeTasks] = useState([]);

  // display collaboration task
  const [displayTasks, setDisaplyTasks] = useState(null);

  const axiosSecure = useAxiosSecure();

  const { data: collabTasks, isLoading } = useQuery({
    queryKey: ["collaborativeTask", selectedFriend],

    queryFn: async () => {
      if (selectedFriend) {
        const res = await axiosSecure.get(
          `/tasks/collaboration?collaboratorID=${selectedFriend.friendId}&userID=${user.userId}`
        );
        const res2 = await axiosSecure.get(
          `/tasks/collaboration?collaboratorID=${user.userId}&userID=${selectedFriend.friendId}`
        );

        // combining the both data on return
        return [...res.data, ...res2.data];
      } else {
        return null;
      }
    },
  });

  // saving the data in state
  useEffect(() => {
    setCollaborativeTasks(collabTasks);
  }, [collabTasks]);

  // showing the displayable data
  useEffect(() => {
    setDisaplyTasks(collabTasks);
  }, [collabTasks]);

  // getting friend list
  const { data: friendList, isLoading: isFriendLoading } = useQuery({
    queryKey: ["allFriendList"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/friend/getlist?userId=${user.userId}`
      );

      return res.data;
    },
  });

  return (
    <section>
      <div className="flex items-center  justify-between">
        <SectionHeading>Collaborative Task</SectionHeading>

        <div className="flex items-center justify-center gap-[20px]">
          <div className="w-[180px]">
            <Link to={"/friends-requests"}>
              <CommonButton
                text="Friend Requests"
                bGcolor="rgba(199, 22, 243, 0.15)"
                color="#C716F3"
              />
            </Link>
          </div>
          <BackButton />
        </div>
      </div>
      {/* collaborative friends */}
      <div className="mt-[37px] flex items-start gap-[30px]">
        {/* friend list  */}
        {!isFriendLoading && (
          <div className="min-w-[390px] py-[22px] rounded-[5px] border-[1px] border-[#e1e1e1] box-shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)]">
            <p className="text-base font-semibold text-headingColor px-[24px] mb-[8px]">
              Friends list
            </p>
            <ul className="h-[445px] overflow-auto">
              {friendList.length > 0 ? (
                friendList.map((singleFriend) => (
                  <li
                    key={singleFriend.id}
                    className={`relative flex items-center cursor-pointer ${
                      selectedFriend?.friendId === singleFriend.friendId
                        ? "bg-primaryColor/20"
                        : ""
                    } gap-[14px] py-[9px] px-[24px] mt-[8px] first:mt-0`}
                    onClick={() => {
                      if (selectedFriend?.friendId === singleFriend.friendId) {
                        setSelectedFriend(null);
                      } else {
                        setSelectedFriend(singleFriend);
                      }
                    }}
                  >
                    <div>
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={
                          singleFriend.img
                            ? `data:image/jpeg;base64,${singleFriend.img}`
                            : defaultProfile
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-[6px]">
                        {singleFriend.friendName}
                      </h3>
                      <p className="text-xs leading-3 text-paraColor">
                        {" "}
                        {singleFriend.collaborationCount
                          ? `${singleFriend.collaborationCount} Tasks with you`
                          : "No Collaboration yet"}{" "}
                      </p>
                    </div>
                    {selectedFriend && (
                      <div
                        className="absolute top-1/2 right-[24px] -translate-y-[50%] cursor-pointer"
                        onClick={() => setSelectedFriend(null)}
                      >
                        {selectedFriend?.friendId === singleFriend.friendId ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                          >
                            <path
                              d="M13.66 12.8301L1 1"
                              stroke="#36B37E"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1 12.8301L13.66 1"
                              stroke="#36B37E"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <div className="text-center flex items-center justify-center h-full text-2xl font-semibold text-paraLight">
                  {" "}
                  <p>No Friend Avaialable</p>{" "}
                </div>
              )}
            </ul>
            <div className="px-[24px] mt-12">
              <Link to={"/add-friends"}>
                <CommonButton text="Add New Friend" icon={AddFriendIcon} />
              </Link>
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="h-[calc(100vh-287px)] w-full flex justify-center">
            <Loader />
          </div>
        ) : displayTasks?.length > 0 ? (
          <div className="grid grid-cols-2 gap-[30px] max-h-[calc(100vh-287px)] pr-[10px] overflow-auto w-full">
            {collaborativeTasks.map((task, index) => (
              <Task taskInfo={task} key={index} />
            ))}
          </div>
        ) : (
          <div className="w-full h-full">
            <NoContent text="No Task Avaialable" />
          </div>
        )}
      </div>
    </section>
  );
}
