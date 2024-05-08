import BgImg from "../../assets/images/header-bg.png";
import ErrorImg from "../../assets/images/error.png";
import { Link } from "react-router-dom";
import AuthButton from "../Authentication/components/AuthButton";
const Error = () => {
  return (
    <section className="rest--pass--section">
      <div
        className="w-full h-[174px] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${BgImg})` }}
      ></div>
      <div className="main--content--upper w-[1320px] overflow-hidden mx-auto -mt-[60px] rounded-[24px]">
        <div className="main--content--wrapperV2 bg-[#fff] p-7 overflow-auto">
          <div className="w-[580px] mx-auto py-[24px]">
            <img
              className="w-full h-[520px] object-cover"
              src={ErrorImg}
              alt=""
            />
            <Link to={"/"} className="mt-[45px] block">
              <AuthButton>Back To Home</AuthButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
