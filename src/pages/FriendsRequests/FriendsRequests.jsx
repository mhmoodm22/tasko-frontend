import SectionHeading from "../../components/SectionHeading/SectionHeading";
import BackButton from "../../components/BackButton.jsx/BackButton";
import RequestCard from "../../components/RequestCard/RequestCard";
import useAuthContext from "../../hooks/useAuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import NoContent from "../../components/NoContent/NoContent";

export default function FriendsRequests() {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["FriendRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/friend/newRequest?userId=${user.userId}`
      );

      return res.data;
    },
  });

  return (
    <section>
      <div className="flex items-center justify-between pb-5 lg:pb-[25px] border-b-[1px] border-[#E1E1E1]">
        <SectionHeading>Friends Requests</SectionHeading>
        <BackButton />
      </div>
      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <div className=" mt-4 lg:mt-6 max-h-[calc(100vh-285px)] flex flex-col overflow-auto">
          {data.map((request) => (
            <RequestCard
              key={request.id}
              singleRequest={request}
              refetch={refetch}
            />
          ))}
        </div>
      ) : (
        <div className="my-10">
          <NoContent text="No Friend Request Available" />
        </div>
      )}
    </section>
  );
}
