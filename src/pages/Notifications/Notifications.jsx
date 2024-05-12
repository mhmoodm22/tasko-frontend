import { useState } from "react";
import BackButton from "../../components/BackButton.jsx/BackButton";
import NoContent from "../../components/NoContent/NoContent";
import SectionHeading from "../../components/SectionHeading/SectionHeading";

const SingleNotification = ({ data }) => {
  return (
    <div className="px-[22px] py-4 rounded-[10px] bg-[#FAFAFA] ">
      <p>{data.title}</p>
    </div>
  );
};

const Notifications = () => {
  const list = [
    {
      title: "notificaton",
      value: "content",
    },
    {
      title: "notificaton",
      value: "content",
    },
    {
      title: "notificaton",
      value: "content",
    },
    {
      title: "notificaton",
      value: "content",
    },
    {
      title: "notificaton",
      value: "content",
    },
    {
      title: "notificaton",
      value: "content",
    },
    {
      title: "notificaton",
      value: "content",
    },
    {
      title: "notificaton",
      value: "content",
    },
    {
      title: "notificaton",
      value: "content",
    },
  ];

  const [notfications, setNotifications] = useState(list);

  return (
    <section>
      {/* top part */}
      <div className="flex items-center justify-between pb-4 lg:pb-9 border-b border-solid border-[#E1E1E1]">
        <SectionHeading>Notifications</SectionHeading>
        <BackButton />
      </div>

      {/* Notifications wrapper */}
      <div className="pt-5">
        {notfications.length > 0 ? (
          <div className="flex flex-col gap-5 max-h-[calc(100vh-250px)]  lg:max-h-[calc(100vh-320px)] overflow-auto">
            {notfications.map((singleOne, index) => (
              <SingleNotification data={singleOne} key={index} />
            ))}
          </div>
        ) : (
          <NoContent text="No Notifications Yet !" />
        )}
      </div>
    </section>
  );
};

export default Notifications;
