import PropTypes from "prop-types";

const SectionHeading = ({ children = "heading text" }) => {
  return (
    <h2 className="text-[24px] font-semibold text-headingColor">{children}</h2>
  );
};

SectionHeading.propTypes = {
  children: PropTypes.string,
};

export default SectionHeading;
