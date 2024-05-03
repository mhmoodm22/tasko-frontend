import { useState } from "react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import SmallCommonButton from "../../components/CommonButton/SmallCommonButton";
import BackButton from "../../components/BackButton.jsx/BackButton";
import RequestCard from "../../components/RequestCard/RequestCard";

export default function FriendsRequests() {
  const friendRequestList = [
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
      name: "Marco",
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

  const [allFriendRequest, setAllFriendRequest] = useState(friendRequestList);

  return (
    <section>
      <div className="flex items-center justify-between pb-[25px] border-b-[1px] border-[#E1E1E1]">
        <SectionHeading>Friends Requests</SectionHeading>
        <BackButton />
      </div>
      <div className="mt-6 max-h-[calc(100vh-285px)] overflow-auto">
        {allFriendRequest.map((request) => (
          <RequestCard key={request.id} singleRequest={request} />
        ))}
      </div>
    </section>
  );
}