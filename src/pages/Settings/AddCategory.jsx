import PropTypes from "prop-types";
import CommonButton from "../../components/CommonButton/CommonButton";

const AddCategory = ({ isActive, setIsActive }) => {
  return (
    <div
      className={`fixed w-full h-screen top-0 left-0 bg-[rgba(0,0,0,.4)] flex items-center justify-center duration-300 ease-in-out ${
        isActive ? "" : "opacity-0 invisible"
      }`}
    >
      {/* content */}
      <div className="w-[420px] h-[245px] bg-[#fff] rounded-[20px] flex flex-col py-[42px] gap-3 items-center relative">
        <h3 className="text-2xl leading-8 font-semibold text-headingColor">
          Add New Category
        </h3>

        <div className="w-full px-5">
          <input
            className="py-3 px-[22px] w-full rounded border border-solid border-[#E1E1E1] placeholder:text-[#667085] text-headingColor text-base font-medium focus:outline-none"
            type="text"
            placeholder="Enter Your category name"
          />
        </div>

        <div className="w-[165px] pt-3">
          <CommonButton text={"Save"} />
        </div>

        {/* close button */}
        <div
          onClick={() => setIsActive(false)}
          className="w-[12px] h-[12px] cursor-pointer absolute top-5 right-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            className="w-full h-full"
          >
            <path
              d="M13.66 12.8301L1 1"
              stroke="#1F1F1F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 12.8301L13.66 1"
              stroke="#1F1F1F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

AddCategory.propTypes = {
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
};

export default AddCategory;
