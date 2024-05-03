import React, { useState } from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import FriendCard from "./Components/FriendCard";
import BackButton from "../../components/BackButton.jsx/BackButton";

export default function AddFriends() {
  const newFriendsData = [
    {
      id: 1,
      profileImg: "https://i.ibb.co/0mVLHgY/image-59.png",
      name: "Hope Young",
      level: 0,
    },
    {
      id: 2,
      profileImg:
        "https://i.ibb.co/bvYC77h/napat-saeng-zx9p82-J9sc-unsplash.png",
      name: "Hope Young",
      level: 1,
    },
    {
      id: 3,
      profileImg: "https://i.ibb.co/VjMVgpw/image-113.png",
      name: "Hope Young",
      level: 2,
    },
    {
      id: 4,
      profileImg:
        "https://i.ibb.co/mqyYm6C/close-up-happy-amazed-young-african-american-dark-skinned-man-feels-great-wears-orange-rain-coat-bro.png",
      name: "Hope Young",
      level: 3,
    },
    {
      id: 8,
      profileImg:
        "https://i.ibb.co/mqyYm6C/close-up-happy-amazed-young-african-american-dark-skinned-man-feels-great-wears-orange-rain-coat-bro.png",
      name: "Hope Young",
      level: 3,
    },

    {
      id: 7,
      profileImg: "https://i.ibb.co/VjMVgpw/image-113.png",
      name: "Hope Young",
      level: 2,
    },
    {
      id: 5,
      profileImg: "https://i.ibb.co/0mVLHgY/image-59.png",
      name: "Hope Young",
      level: 0,
    },
    {
      id: 6,
      profileImg:
        "https://i.ibb.co/bvYC77h/napat-saeng-zx9p82-J9sc-unsplash.png",
      name: "Hope Young",
      level: 1,
    },

    {
      id: 9,
      profileImg: "https://i.ibb.co/0mVLHgY/image-59.png",
      name: "Hope Young",
      level: 0,
    },
    {
      id: 10,
      profileImg:
        "https://i.ibb.co/bvYC77h/napat-saeng-zx9p82-J9sc-unsplash.png",
      name: "Hope Young",
      level: 1,
    },
    {
      id: 11,
      profileImg: "https://i.ibb.co/VjMVgpw/image-113.png",
      name: "Hope Young",
      level: 2,
    },
    {
      id: 12,
      profileImg:
        "https://i.ibb.co/mqyYm6C/close-up-happy-amazed-young-african-american-dark-skinned-man-feels-great-wears-orange-rain-coat-bro.png",
      name: "Hope Young",
      level: 3,
    },
  ];
  const [newFriendsInfo, setNewFriendsInfo] = useState(newFriendsData);


  return (
    <section>
      <div className="flex items-center justify-between mb-[35px]">
        <SectionHeading>Add New Friends</SectionHeading>
        <BackButton />
      </div>
      {/* new friends  */}
      <div className="grid grid-cols-4 gap-[30px] max-h-[calc(100vh-270px)] overflow-auto pb-[25px] pr-[10px]">
        {newFriendsInfo.map((singleInfo) => (
          <FriendCard singleInfo={singleInfo} key={singleInfo.id} newFriendsInfo={newFriendsInfo} />
        ))}
      </div>
    </section>
  );
}
