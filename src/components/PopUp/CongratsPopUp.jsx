import PropTypes from "prop-types";
import PopUp from "../../assets/images/complete-task-popup.svg";

const CongratsPopUp = ({ isActive, setIsActive, mainText }) => {
  return (
    <section
      className={`fixed left-0 top-0 w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,.4)] duration-300 ease-in-out ${
        isActive ? "" : "opacity-0 invisible"
      }`}
    >
      {/* content */}
      <div className=" w-[690px] bg-[#fff] rounded-2xl px-[85px] py-[72px] flex flex-col items-center gap-[45px] relative">
        <div className=" w-[517px] h-[272px] ">
          <img className="w-full h-full object-contain" src={PopUp} alt="" />
        </div>

        {/* text area */}
        <div className="text-center space-y-2 max-w-[495px] mx-auto">
          <h3 className="text-headingColor text-2xl font-semibold leading-8 ">
            {mainText}
          </h3>

          <p className="text-[#737791] text-base leading-7 ">
            Congratulations! you have successfully completed the task and you
            got 20 points.
          </p>
        </div>

        {/* close button */}
        <div
          onClick={() => setIsActive(false)}
          className="w-3 h-3 absolute top-6 right-6 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill="none"
          >
            <path
              d="M13.66 11.7591L1 1"
              stroke="#1F1F1F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 11.7591L13.66 1"
              stroke="#1F1F1F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

CongratsPopUp.propTypes = {
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  mainText: PropTypes.string,
};

export default CongratsPopUp;
