import PropTypes from "prop-types";
import noContentImg from "../../assets/images/noTask.png";
const NoContent = ({ text = "no content is avilable" }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="w-[423px] h-[336px] object-cover"
        src={noContentImg}
        alt=""
      />
      <p className="text-2xl font-semibold text-headingColor mt-[28px]">
        {text}
      </p>
    </div>
  );
};

NoContent.propTypes = {
  text: PropTypes.string,
};

export default NoContent;
