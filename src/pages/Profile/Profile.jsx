import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Profile.css";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import editIcon from "../../assets/images/profile-edit-icon.svg";
import taskComplete from "../../assets/images/complete-task.svg";
import { useCallback, useRef, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import defaultProfile from "../../assets/images/default-profile.png";
import { FaFileImage } from "react-icons/fa6";

import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import CommonButton from "../../components/CommonButton/CommonButton";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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

  // eslint-disable-next-line
  const [badgeList, setBadgeList] = useState(badges);

  const [uploadedImage, setUploadedImage] = useState(null);
  // eslint-disable-next-line
  const [updatedName, setUpdatedName] = useState(null);

  const [isPopUpActive, setIsPopUpActive] = useState(false);

  const nameInput = useRef(null);

  let { user, setUser } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  // drop zone functionality
  const onDrop = useCallback((acceptedFiles) => {
    // storing the image to state

    if (acceptedFiles.length) {
      setUploadedImage(acceptedFiles[0]);
    } else {
      setUploadedImage(null);
      toast.error("Please Upload a Valid Single Picture");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });

  const handleUpdate = () => {
    if (uploadedImage) {
      const formData = new FormData();

      formData.append("file", uploadedImage);

      axiosSecure
        .post(`/users/change-image?id=${user.userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // adding the image we got in response , to see the changes immediately
          setUser({ ...user, img: res.data.img });
          toast.success("Updated Data Successfully");

          setUploadedImage(null);
          setIsPopUpActive(false);
        })
        .catch((err) => toast.error(err.message));
    } else {
      toast.error("Please Update Something ");
    }
  };

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
                {user.img ? (
                  <img
                    className="w-full h-full object-cover rounded-full border-4 border-primaryColor shadow-lg"
                    src={`data:image/jpeg;base64,${user.img.underlyingStream.bytes}`}
                  />
                ) : (
                  <img
                    className="w-full h-full object-contain rounded-full border-4 border-primaryColor shadow-lg"
                    src={user?.img ? user.img : defaultProfile}
                    alt=""
                  />
                )}

                {/* edit icon */}
                <div
                  onClick={() => setIsPopUpActive(true)}
                  className="w-[52px] h-[52px] absolute right-0 bottom-0 cursor-pointer overflow-hidden"
                >
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

      {/* edit profile pop up */}
      <div
        className={`fixed top-0 left-0 z-50 w-full h-screen bg-[rgba(0,0,0,0.4)] flex items-center justify-center duration-300 ease-in-out ${
          isPopUpActive ? "" : "opacity-0 invisible"
        }  `}
      >
        {/* content */}
        <div className="bg-[#fff] w-[500px] p-8 rounded-2xl relative ">
          <h3 className="text-headingColor text-2xl leading-8 font-semibold pb-6 ">
            Edit Profile
          </h3>

          {/* drop zone */}
          <div>
            <div
              className="border-2 border-primaryColor border-dotted h-[180px] flex items-center justify-center rounded-2xl bg-[#f0fdf7] "
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <div className="flex flex-col items-center gap-2 ">
                  <div className="w-16 h-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      className="w-full h-full"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.39844 32.0004C6.39844 39.0696 12.1292 44.8004 19.1984 44.8004H28.7984V54.4004C28.7984 56.1677 30.2311 57.6004 31.9984 57.6004C33.7658 57.6004 35.1984 56.1677 35.1984 54.4004V44.8004H44.7984C51.8677 44.8004 57.5984 39.0696 57.5984 32.0004C57.5984 24.9311 51.8677 19.2004 44.7984 19.2004C44.7984 12.1311 39.0677 6.40039 31.9984 6.40039C24.9292 6.40039 19.1984 12.1311 19.1984 19.2004C12.1292 19.2004 6.39844 24.9311 6.39844 32.0004ZM35.1984 44.8004H28.7984L28.7984 30.1259L24.6612 34.2631C23.4115 35.5128 21.3854 35.5128 20.1357 34.2631C18.886 33.0135 18.886 30.9873 20.1357 29.7376L29.7357 20.1376C30.9854 18.888 33.0115 18.888 34.2612 20.1376L43.8612 29.7376C45.1109 30.9873 45.1109 33.0135 43.8612 34.2631C42.6115 35.5128 40.5854 35.5128 39.3357 34.2631L35.1984 30.1259V44.8004Z"
                        fill="#60E5AE"
                      />
                    </svg>
                  </div>

                  <p className="text-center text-base text-headingColor leading-5 font-semibold">
                    Upload your Profile Picture
                  </p>

                  <p className="text-base text-primaryColor font-medium underline leading-6">
                    Browse File
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* uploaded files list */}
          {uploadedImage && (
            <div>
              <p className="py-3 flex items-center gap-1 font-semibold text-base text-primaryColor">
                <FaFileImage /> <span>{uploadedImage.path} </span>
              </p>
            </div>
          )}

          {/* name editing  */}
          <div className="pt-7">
            <p className="text-base leading-5 text-headingColor font-semibold pb-2">
              Edit User Name
            </p>

            <input
              ref={nameInput}
              type="text"
              placeholder="Enter your user name"
              className="px-[22px] py-3 rounded border border-solid border-[#E1E1E1] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)] placeholder:text-[#667085] text-base text-headingColor focus:outline-none w-full"
              defaultValue={user.userName}
            />

            {/* submit button */}
            <div onClick={() => handleUpdate()} className="w-full mt-5">
              <CommonButton text={"Save"} />
            </div>

            {/* close button */}
            <div
              onClick={() => setIsPopUpActive(false)}
              className="w-3 h-3 absolute top-10 right-5 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M11.4639 11.779L1 1.01562"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 11.779L11.4639 1.01562"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
