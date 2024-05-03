import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Profile.css";

import profileImg from "../../assets/images/user-profile.png";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import editIcon from "../../assets/images/profile-edit-icon.svg";
import taskComplete from "../../assets/images/complete-task.svg";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import defaultProfile from "../../assets/images/default-profile.png";

const Profile = () => {
  let commonBorderStyle =
    "mt-4 border border-solid border-[#E1E1E1] rounded-md";
  const maxProgress = 100;
  const currentProgress = 75;

  const progressStyles = {
    pathColor: `#01a266`,
    trailColor: `#e6fbf3`,
  };

  const badges = [
    {
      badgeName: "Newbie",
      badgeIcon:
        "https://res.cloudinary.com/dye3v5rwp/image/upload/v1714309178/badge1_ytsvki.svg",
      bgColor: "#f4f2fc",
      textColor: "#FFAB00",
    },
    {
      badgeName: "Fan",
      badgeIcon:
        "https://res.cloudinary.com/dye3v5rwp/image/upload/v1714309179/badge2_fqhi7l.svg",
      bgColor: "rgba(213, 97, 23, 0.10)",
      textColor: "#FFAB00",
    },
    {
      badgeName: "Talented",
      badgeIcon:
        "https://res.cloudinary.com/dye3v5rwp/image/upload/v1714309179/badge3_hzpkyd.svg",
      bgColor: "rgba(158, 64, 173, 0.10)",
      textColor: "#5A5C5F",
    },
    {
      badgeName: "Expert",
      badgeIcon:
        "https://res.cloudinary.com/dye3v5rwp/image/upload/v1714309179/badge4_ojygi9.svg",
      bgColor: "#eae7e6",
      textColor: "#5A5C5F",
    },
    {
      badgeName: "Pro",
      badgeIcon:
        "https://res.cloudinary.com/dye3v5rwp/image/upload/v1714309179/badge5_crimj8.svg",
      bgColor: "#f4f2fc",
      textColor: "#5A5C5F",
    },
  ];

  const [badgeList, setBadgeList] = useState(badges);

  const { user } = useAuthContext();

  return (
    <section>
      {/* main area wrapper */}
      <div className="flex items-start gap-[30px] ">
        {/* profile area */}
        <div className="w-[65%]">
          <SectionHeading>Profile</SectionHeading>

          {/* inner wrapper area */}
          <div className={`flex flex-col ${commonBorderStyle}`}>
            {/* profile avatar area */}
            <div className="flex flex-col items-center justify-center  py-[45px]  ">
              {/* profile image */}
              <div className="w-[200px] h-[200px] relative ">
                <img
                  className="w-full h-full object-contain rounded-full border-4 border-primaryColor shadow-lg"
                  src={user?.img ? user.img : defaultProfile}
                  alt=""
                />

                {/* edit icon */}
                <div className="w-[52px] h-[52px] absolute right-0 bottom-0 cursor-pointer overflow-hidden">
                  <img className="w-full h-full" src={editIcon} />
                </div>
              </div>

              {/* profile info */}
              <div className="pt-4 text-center">
                {/* profile name */}
                <h3 className="text-[31px] font-semibold text-headingColor leading-[40px]">
                  {user.userName && user.userName}
                </h3>
                {/* email */}
                <p className="text-sm text-paraLight ">
                  {" "}
                  {user.email && user.email}{" "}
                </p>
              </div>
            </div>

            {/* badges area */}
            <div className="p-9 border-t border-solid border-[#E1E1E1] ">
              <h3 className="text-base text-headingColor leading-5 font-semibold ">
                Badges
              </h3>

              {/* badges holder */}

              <div className="flex items-center gap-6 pt-5">
                {badgeList.map((item, index) => (
                  <div key={index} className="w-fit">
                    <div
                      style={{
                        backgroundColor: item.bgColor,
                      }}
                      className="w-[82px] h-[82px] rounded-full flex items-center justify-center"
                    >
                      <img
                        className="w-10 h-10 object-contain"
                        src={item.badgeIcon}
                        alt=""
                      />
                    </div>

                    {/* text */}
                    <p
                      style={{
                        color: item.textColor,
                      }}
                      className="text-center text-sm font-medium pt-2 "
                    >
                      {" "}
                      {item.badgeName}{" "}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* progress area */}
        <div className="w-[35%]">
          <SectionHeading>Progress</SectionHeading>
          {/* level wrapper area */}
          <div className={`${commonBorderStyle} p-9`}>
            <h3 className="text-base text-headingColor leading-5 font-semibold">
              Level
            </h3>

            {/* level circle progess */}
            <div className="flex flex-col items-center">
              <div className="w-[195px] h-[195px] flex items-center justify-center">
                <CircularProgressbarWithChildren
                  value={currentProgress}
                  maxValue={100}
                  className="mx-auto"
                  strokeWidth={10}
                  styles={buildStyles(progressStyles)}
                >
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-[37px] font-semibold text-headingColor leading-[50px]">
                      {" "}
                      {currentProgress}{" "}
                    </p>
                    <p className="text-[10px] text-headingColor font-medium">
                      Earn Point
                    </p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>

              {/* level text */}
              <div className="text-center">
                <h3 className="text-[34px] font-semibold leading-10 text-[#FFAB00] pt-[10px]">
                  Level 2
                </h3>
                <p className="text-[#5A5C5F] text-sm font-medium pt-1">
                  You Need {maxProgress - currentProgress} Point to go to Next
                  Level
                </p>
              </div>
            </div>
          </div>

          {/* complete task text area */}
          <div className="flex flex-col items-center py-6 bg-[#F4F2FC] rounded-md mt-5">
            {/* icon */}
            <div className="w-[217px] h-[112px]">
              <img
                className="w-full h-full object-contain"
                src={taskComplete}
              />
            </div>

            <h3 className="text-headingColor text-base leading-5 font-semibold pt-1 ">
              Complete Your task
            </h3>
            <p className="text-sm leading-5 text-paraColor">
              Unlock achievements and earn point to go to your level up
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
