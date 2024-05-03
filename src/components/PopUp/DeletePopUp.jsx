import PropTypes from "prop-types";

import bannerSvg from "../../assets/images/delete-popup.svg";

const Button = ({ children, bgColor }) => {
  return (
    <button
      style={{
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        backgroundColor: bgColor,
      }}
      className={`w-[144px] flex items-center justify-center py-3 text-headingColor text-base font-medium leading-6 rounded-lg`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
  actionFunc: PropTypes.func,
};

const DeletePopUp = ({ isActive, setIsActive }) => {
  return (
    <div
      className={`fixed w-full h-screen top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,.4)] z-10 duration-300 ease-in-out ${
        isActive ? "" : "opacity-0 invisible"
      }`}
    >
      {/* wrapper */}
      <div className="px-[86px] py-[34px] bg-[#fff] rounded-[20px] flex flex-col items-center justify-center gap-5">
        <div className="w-[338px] h-[250px] overflow-hidden ">
          <img className="w-full h-full object-cover" src={bannerSvg} alt="" />
        </div>

        {/* title */}
        <div className="text-center">
          <h3 className="text-[40px] text-headingColor font-semibold leading-[50px] pb-1">
            Are you Sure!!
          </h3>
          <p className="text-[18px] text-[#737791]">
            Do you want to delete this Task on this app?
          </p>
        </div>

        {/* button wrapper */}
        <div className="flex items-center gap-5">
          <div className="w-fit">
            <Button bgColor={"#60E5AE"}>Yes</Button>
          </div>
          <div onClick={() => setIsActive(false)} className="w-fit">
            <Button
              actionFunc={setIsActive}
              bgColor={"rgba(255, 76, 36, 0.15)"}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeletePopUp.propTypes = {
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
};

export default DeletePopUp;
