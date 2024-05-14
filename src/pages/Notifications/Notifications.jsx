import BackButton from "../../components/BackButton.jsx/BackButton";
import NoContent from "../../components/NoContent/NoContent";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../hooks/useAuthContext";
import Loader from "../../components/Loader/Loader";
import PropTypes from "prop-types";
import moment from "moment";
import defaultProfile from "../../assets/images/default-profile.png";

const SingleNotification = ({ data }) => {
  return (
    <div className="px-[22px] py-4 rounded-[10px] bg-[#FAFAFA] flex items-center gap-4 ">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={
            data.img ? `data:image/jpeg; base64,${data.img}` : defaultProfile
          }
          alt=""
        />
      </div>
      <div className="space-y-2">
        <p className="text-headingColor text-sm leading-4 font-medium">
          {" "}
          {data.message}{" "}
        </p>
        <span className="text-paraColor text-xs leading-3 font-normal  ">
          {" "}
          {moment(data.createTime).fromNow()}{" "}
        </span>
      </div>
    </div>
  );
};

const Notifications = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notification?userId=${user.userId}`);

      return res.data;
    },
  });

  console.log(data);

  return (
    <section>
      {/* top part */}
      <div className="flex items-center justify-between pb-4 lg:pb-9 border-b border-solid border-[#E1E1E1]">
        <SectionHeading>Notifications</SectionHeading>
        <BackButton />
      </div>

      {/* Notifications wrapper */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pt-5">
          {data.length > 0 ? (
            <div className="flex flex-col gap-5 max-h-[calc(100vh-250px)]  lg:max-h-[calc(100vh-320px)] overflow-auto">
              {data.map((singleOne, index) => (
                <SingleNotification data={singleOne} key={index} />
              ))}
            </div>
          ) : (
            <NoContent text="No Notifications Available" />
          )}
        </div>
      )}
    </section>
  );
};

export default Notifications;

SingleNotification.propTypes = {
  data: PropTypes.object,
};
