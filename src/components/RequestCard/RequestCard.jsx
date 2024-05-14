import SmallCommonButton from "../CommonButton/SmallCommonButton";
import PropTypes from "prop-types";
import defaultProfile from "../../assets/images/default-profile.png";
import moment from "moment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
function RequestCard({ singleRequest, refetch }) {
  const axiosSecure = useAxiosSecure();

  console.log(singleRequest);

  const acceptRequest = () => {
    axiosSecure
      .put(`/friend/acceptRequest?id=${singleRequest.id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("You are now Friends");
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An Error Occured");
      });
  };
  const rejectRequest = () => {
    axiosSecure
      .put(`/friend/rejectRequest?id=${singleRequest.id}`)
      .then((res) => {
        if (res.status === 200) {
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An Error Occured");
      });
  };

  return (
    <div className="flex  lg:items-center justify-between py-4 px-[22px] flex-col lg:flex-row gap-3 lg:gap-0 ">
      <div className="flex items-center gap-[14px]">
        <img
          className="h-[48px] w-[48px] object-cover rounded-full"
          src={
            singleRequest.img
              ? `data:image/jpeg;base64,${singleRequest.img}`
              : defaultProfile
          }
          alt=""
        />
        <div>
          <h3 className="text-base font-semibold text-headingColor">
            {singleRequest.friendName}
          </h3>
          <p className="text-paraLight text-[14px] mt-1.5">
            {" "}
            {moment(singleRequest.createTime).fromNow()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div onClick={acceptRequest} className="w-fit">
          <SmallCommonButton text="Accept" />
        </div>
        <div onClick={rejectRequest} className="w-fit">
          <SmallCommonButton
            text="Reject"
            bGcolor="rgba(255, 76, 36, 0.15)"
            color="#FF4C24"
          />
        </div>
      </div>
    </div>
  );
}

RequestCard.propTypes = {
  singleRequest: PropTypes.object,
  refetch: PropTypes.func,
};

export default RequestCard;
