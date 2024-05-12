import PropTypes from "prop-types";
export default function CommonButton({
  text,
  bGcolor = "#60E5AE",
  color = "#1F1F1F",
}) {
  return (
    <button
      style={{
        backgroundColor: bGcolor,
        color: color,
      }}
      className={`flex items-center py-[9px] justify-center px-[32px]  rounded-[8px] font-semibold capitalize leading-[27px]`}
    >
      {text}
    </button>
  );
}

CommonButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  bGcolor: PropTypes.string,
  color: PropTypes.string,
};
