import PropTypes from "prop-types";
export default function CommonButton({
  icon,
  text,
  bGcolor = "#60E5AE",
  color = "#1F1F1F",
  smallIcon = null,
}) {
  return (
    <button
      style={{
        backgroundColor: bGcolor,
        color: color,
      }}
      className={`flex items-center ${
        icon || smallIcon ? "gap-[10px]" : ""
      } py-[12px] justify-center w-full block rounded-[8px] font-semibold capitalize leading-[27px] `}
    >
      {icon && <img className="w-6 h-6" src={icon} alt="" />}
      {text}
      {smallIcon && (
        <img className="w-[16px] h-[16px]" src={smallIcon} alt="" />
      )}
    </button>
  );
}

CommonButton.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  bGcolor: PropTypes.string,
  color: PropTypes.string,
  smallIcon: PropTypes.string,
};
