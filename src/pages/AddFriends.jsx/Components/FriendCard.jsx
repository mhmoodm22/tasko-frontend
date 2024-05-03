import { useState } from "react";
import Badge from "../../../assets/images/badge.png";

export default function FriendCard({ singleInfo, newFriendsInfo }) {
  const [isSent, setIsSent] = useState(null);

  const handleRequestSent = (userId) => {
    setIsSent(userId);
  };

  return (
    <div className="h-full py-5 px-4 border-[1px] border-[#fff] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)] text-center rounded-[5px]">
      <div className="relative">
        <img
          className="h-[86px] w-[86px] rounded-full object-cover mx-auto"
          src={singleInfo.profileImg}
          alt=""
        />
        <div className="absolute -bottom-3 left-1/2 -translate-x-[50%] py-1 px-[10px] w-[106px] rounded-[114px] bg-[#B690F0]/[22%] backdrop-blur-[46px] flex items-center">
          <img className="h-6 w-6 object-contain mr-2" src={Badge} alt="" />
          Level {singleInfo.level}
        </div>
      </div>
      <h3 className="text-base font-semibold text-headingColor mt-6 mb-3">
        {singleInfo.name}
      </h3>
      <button
        className="py-2 w-[190px] mx-auto px-10 bg-primaryColor/15 rounded-[8px] text-primaryColor"
        onClick={() => handleRequestSent(singleInfo.id)}
      >
        {isSent === singleInfo.id ? "Request Sent" : "Add Friend"}
      </button>
    </div>
  );
}
