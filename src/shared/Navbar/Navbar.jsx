import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import HeaderBg from "../../assets/images/header-bg.png";
import TalentedBadge from "../../assets/images/talented-badge.svg";
import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import defaultProfile from "../../assets/images/default-profile.png";

const Navbar = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [shortNav, setShortNav] = useState("");
  const [tallNav, setTallNav] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user, logOut } = useAuthContext();

  useEffect(() => {
    if (pathname === "/") {
      setShortNav(false);
      setTallNav(true);
    } else {
      setShortNav(true);
      setTallNav(false);
    }
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", (event) => {
      let dropdown = document.querySelector(".profile--dropdown");
      let trigger = document.querySelector(".dropdown--trigger");

      if (dropdown && trigger) {
        if (
          !trigger.contains(event.target) &&
          !dropdown.contains(event.target)
        ) {
          setIsDropdownActive(false);
        }
      }
    });
  }, []);

  return (
    <header
      style={{
        backgroundImage: `url(${HeaderBg})`,
      }}
      className={`${shortNav ? "h-[175px]" : ""} ${
        tallNav ? "h-[306px]" : ""
      } pt-[26px] pb-[30px] bg-cover bg-no-repeat`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <Link to={"/"}>
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div>
            <ul className="menu--wrap flex items-center gap-[50px]">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) => (isActive ? "linkActive" : "")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 12.2H15"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 16.2H12.38"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Task List
                </NavLink>
              </li>
              <li className="spin">
                <NavLink
                  to={"/spin"}
                  className={({ isActive }) => (isActive ? "linkActive" : "")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 13.7812C12.3624 13.7812 12.6562 13.4874 12.6562 13.125C12.6562 12.7626 12.3624 12.4688 12 12.4688C11.6376 12.4688 11.3438 12.7626 11.3438 13.125C11.3438 13.4874 11.6376 13.7812 12 13.7812Z"
                      fill="white"
                      stroke="white"
                    />
                    <path
                      d="M13.8517 2.5065L14.4784 1.00238C14.52 0.902666 14.5364 0.794213 14.526 0.686658C14.5156 0.579102 14.4788 0.475776 14.4189 0.385863C14.359 0.29595 14.2778 0.222237 14.1825 0.171276C14.0872 0.120314 13.9808 0.0936831 13.8727 0.0937501H10.1227C10.0147 0.0936831 9.9083 0.120314 9.81301 0.171276C9.71773 0.222237 9.63652 0.29595 9.57659 0.385863C9.51666 0.475776 9.47987 0.579102 9.4695 0.686658C9.45912 0.794213 9.47548 0.902666 9.51713 1.00238L10.1437 2.5065C8.12156 2.85976 6.24228 3.78307 4.72688 5.16784C3.21148 6.55261 2.12297 8.34128 1.58934 10.3235C1.05572 12.3058 1.09916 14.3992 1.71457 16.3576C2.32998 18.3159 3.49176 20.0579 5.06331 21.3786C6.63486 22.6993 8.55083 23.5439 10.5859 23.8129C12.621 24.082 14.6907 23.7644 16.5514 22.8975C18.4122 22.0305 19.9868 20.6503 21.09 18.9192C22.1932 17.188 22.7792 15.1778 22.779 13.125C22.7919 10.5839 21.9012 8.12093 20.2659 6.17586C18.6307 4.2308 16.3573 2.93027 13.8517 2.5065ZM21.4665 13.125C21.4666 14.1477 21.3002 15.1637 20.9738 16.1329L15.2179 13.7486C15.2994 13.3369 15.2994 12.9131 15.2179 12.5014L20.9835 10.1134C21.3045 11.085 21.4676 12.1018 21.4665 13.125ZM20.4855 8.89875L14.7157 11.2875C14.4807 10.9409 14.1819 10.642 13.8353 10.407L16.2244 4.63912C18.0742 5.55218 19.5718 7.04921 20.4855 8.89875ZM11.9977 15.0938C11.6084 15.0938 11.2277 14.9783 10.904 14.762C10.5802 14.5456 10.3279 14.2381 10.1789 13.8784C10.0299 13.5187 9.99086 13.1228 10.0668 12.7409C10.1428 12.359 10.3303 12.0082 10.6056 11.7329C10.881 11.4575 11.2318 11.27 11.6137 11.1941C11.9956 11.1181 12.3914 11.1571 12.7512 11.3061C13.1109 11.4551 13.4184 11.7075 13.6347 12.0312C13.851 12.355 13.9665 12.7356 13.9665 13.125C13.9659 13.647 13.7583 14.1474 13.3892 14.5165C13.0201 14.8855 12.5197 15.0932 11.9977 15.0938ZM12.8884 1.40625L11.9977 3.54375L11.1071 1.40625H12.8884ZM11.3921 5.50238C11.4419 5.62202 11.5259 5.72426 11.6337 5.79618C11.7415 5.86809 11.8682 5.90648 11.9977 5.90648C12.1273 5.90648 12.254 5.86809 12.3618 5.79618C12.4696 5.72426 12.5536 5.62202 12.6034 5.50238L13.3328 3.75187C13.9018 3.83152 14.4625 3.96205 15.0082 4.14188L12.621 9.90487C12.2095 9.82338 11.786 9.82338 11.3745 9.90487L8.98725 4.14188C9.53297 3.96205 10.0937 3.83152 10.6628 3.75187L11.3921 5.50238ZM7.77225 4.63987L10.1602 10.407C9.8136 10.642 9.5148 10.9409 9.27975 11.2875L3.51 8.89875C4.424 7.04903 5.92197 5.55198 7.77225 4.63912V4.63987ZM2.529 13.125C2.52794 12.1018 2.69101 11.085 3.012 10.1134L8.77763 12.5014C8.69613 12.9131 8.69613 13.3369 8.77763 13.7486L3.02175 16.1329C2.69528 15.1637 2.52885 14.1477 2.529 13.125ZM3.525 17.3449L9.27975 14.9625C9.5148 15.3091 9.8136 15.608 10.1602 15.843L7.7775 21.5978C5.93814 20.6763 4.44633 19.1843 3.525 17.3449ZM8.99025 22.1014L11.3745 16.3451C11.786 16.4266 12.2095 16.4266 12.621 16.3451L15.0052 22.1014C13.054 22.7579 10.9415 22.7579 8.99025 22.1014ZM16.218 21.5978L13.8353 15.843C14.1819 15.608 14.4807 15.3091 14.7157 14.9625L20.4705 17.3464C19.5489 19.1853 18.0571 20.6766 16.218 21.5978Z"
                      fill="white"
                      stroke="white"
                      strokeWidth=".3"
                    />
                  </svg>
                  Spin
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/collaborative-task"}
                  className={({ isActive }) => (isActive ? "linkActive" : "")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17.9981 7.16C17.9381 7.15 17.8681 7.15 17.8081 7.16C16.4281 7.11 15.3281 5.98 15.3281 4.58C15.3281 3.15 16.4781 2 17.9081 2C19.3381 2 20.4881 3.16 20.4881 4.58C20.4781 5.98 19.3781 7.11 17.9981 7.16Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.9675 14.44C18.3375 14.67 19.8475 14.43 20.9075 13.72C22.3175 12.78 22.3175 11.24 20.9075 10.3C19.8375 9.59004 18.3075 9.35003 16.9375 9.59003"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.96656 7.16C6.02656 7.15 6.09656 7.15 6.15656 7.16C7.53656 7.11 8.63656 5.98 8.63656 4.58C8.63656 3.15 7.48656 2 6.05656 2C4.62656 2 3.47656 3.16 3.47656 4.58C3.48656 5.98 4.58656 7.11 5.96656 7.16Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.9975 14.44C5.6275 14.67 4.1175 14.43 3.0575 13.72C1.6475 12.78 1.6475 11.24 3.0575 10.3C4.1275 9.59004 5.6575 9.35003 7.0275 9.59003"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9981 14.63C11.9381 14.62 11.8681 14.62 11.8081 14.63C10.4281 14.58 9.32812 13.45 9.32812 12.05C9.32812 10.62 10.4781 9.46997 11.9081 9.46997C13.3381 9.46997 14.4881 10.63 14.4881 12.05C14.4781 13.45 13.3781 14.59 11.9981 14.63Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.08875 17.78C7.67875 18.72 7.67875 20.26 9.08875 21.2C10.6888 22.27 13.3087 22.27 14.9087 21.2C16.3187 20.26 16.3187 18.72 14.9087 17.78C13.3187 16.72 10.6888 16.72 9.08875 17.78Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Friends
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-[29px] profile--info--list">
            <NavLink
              to={"/notifications"}
              className={({ isActive }) => (isActive ? "linkActive" : "")}
            >
              <div className="relative flex items-center justify-center h-[40px] w-[40px] rounded-full bg-[#232b35]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 4.29333V6.51334"
                    stroke="white"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8.01522 1.33337C5.56189 1.33337 3.57522 3.32004 3.57522 5.77337V7.17337C3.57522 7.62671 3.38855 8.30671 3.15522 8.69337L2.30855 10.1067C1.78855 10.98 2.14855 11.9534 3.10855 12.2734C6.29522 13.3334 9.74188 13.3334 12.9286 12.2734C13.8286 11.9734 14.2152 10.92 13.7286 10.1067L12.8819 8.69337C12.6486 8.30671 12.4619 7.62004 12.4619 7.17337V5.77337C12.4552 3.33337 10.4552 1.33337 8.01522 1.33337Z"
                    stroke="white"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.2213 12.5466C10.2213 13.7666 9.22125 14.7666 8.00125 14.7666C7.39458 14.7666 6.83458 14.5133 6.43458 14.1133C6.03458 13.7133 5.78125 13.1533 5.78125 12.5466"
                    stroke="white"
                    strokeMiterlimit="10"
                  />
                </svg>
                <p className="absolute top-[12px] right-[12px] h-[6px] w-[6px] bg-[#ED0006] rounded-full outline-[3px]"></p>
              </div>
            </NavLink>
            <div className="flex gap-[8px] items-center py-[7px] px-[10px] bg-[#353750] rounded-[114px]">
              <img
                className="w-[24px] h-[20px] object-cover"
                src={TalentedBadge}
                alt=""
              />
              <p className="text-[16px] text-[#fff] font-normal capitalize">
                Level 2
              </p>
            </div>
            {/* profile  */}
            <div className="relative">
              {/* toggler  */}
              <div
                className="flex items-center cursor-pointer dropdown--trigger"
                onClick={() => setIsDropdownActive(!isDropdownActive)}
              >
                <img
                  className="h-[40px] w-[40px] object-cover rounded-full"
                  src={
                    user?.img
                      ? `data:image/jpeg;base64,${user.img.underlyingStream.bytes}`
                      : defaultProfile
                  }
                  alt=""
                />
                <p className="text-[18px] text-white font-medium capitalize ml-[11px]">
                  {user?.userName && user.userName.split(" ")[0]}
                </p>
                <svg
                  className="ml-[4px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.291 10.7074C16.9214 10.0776 16.4754 9 15.5842 9H8.41268C7.52199 9 7.07572 10.0767 7.70525 10.7068L11.2878 14.2926C11.6782 14.6833 12.3113 14.6836 12.702 14.2932L16.291 10.7074Z"
                    fill="#D9D9D9"
                    fillOpacity="0.4"
                  />
                </svg>
              </div>
              {/* profile dropdown */}
              <ul
                className={`profile--dropdown w-[168px] absolute top-[80px] ${
                  isDropdownActive ? "show" : ""
                } left-0 py-[6px] bg-white rounded-[8px]`}
              >
                <li>
                  <NavLink
                    to={"/settings"}
                    className={({ isActive }) => (isActive ? "linkActive" : "")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M15.075 6.915C13.7175 6.915 13.1625 5.955 13.8375 4.7775C14.2275 4.095 13.995 3.225 13.3125 2.835L12.015 2.0925C11.4225 1.74 10.6575 1.95 10.305 2.5425L10.2225 2.685C9.5475 3.8625 8.4375 3.8625 7.755 2.685L7.6725 2.5425C7.335 1.95 6.57 1.74 5.9775 2.0925L4.68 2.835C3.9975 3.225 3.765 4.1025 4.155 4.785C4.8375 5.955 4.2825 6.915 2.925 6.915C2.145 6.915 1.5 7.5525 1.5 8.34V9.66C1.5 10.44 2.1375 11.085 2.925 11.085C4.2825 11.085 4.8375 12.045 4.155 13.2225C3.765 13.905 3.9975 14.775 4.68 15.165L5.9775 15.9075C6.57 16.26 7.335 16.05 7.6875 15.4575L7.77 15.315C8.445 14.1375 9.555 14.1375 10.2375 15.315L10.32 15.4575C10.6725 16.05 11.4375 16.26 12.03 15.9075L13.3275 15.165C14.01 14.775 14.2425 13.8975 13.8525 13.2225C13.17 12.045 13.725 11.085 15.0825 11.085C15.8625 11.085 16.5075 10.4475 16.5075 9.66V8.34C16.5 7.56 15.8625 6.915 15.075 6.915ZM9 11.4375C7.6575 11.4375 6.5625 10.3425 6.5625 9C6.5625 7.6575 7.6575 6.5625 9 6.5625C10.3425 6.5625 11.4375 7.6575 11.4375 9C11.4375 10.3425 10.3425 11.4375 9 11.4375Z"
                        fill="#1F1F1F"
                      />
                    </svg>
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/profile"}
                    className={({ isActive }) => (isActive ? "linkActive" : "")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M9 1.5C7.035 1.5 5.4375 3.0975 5.4375 5.0625C5.4375 6.99 6.945 8.55 8.91 8.6175C8.97 8.61 9.03 8.61 9.075 8.6175C9.09 8.6175 9.0975 8.6175 9.1125 8.6175C9.12 8.6175 9.12 8.6175 9.1275 8.6175C11.0475 8.55 12.555 6.99 12.5625 5.0625C12.5625 3.0975 10.965 1.5 9 1.5Z"
                        fill="#1F1F1F"
                      />
                      <path
                        d="M12.8087 10.6124C10.7162 9.21741 7.30375 9.21741 5.19625 10.6124C4.24375 11.2499 3.71875 12.1124 3.71875 13.0349C3.71875 13.9574 4.24375 14.8124 5.18875 15.4424C6.23875 16.1474 7.61875 16.4999 8.99875 16.4999C10.3787 16.4999 11.7587 16.1474 12.8087 15.4424C13.7537 14.8049 14.2787 13.9499 14.2787 13.0199C14.2712 12.0974 13.7537 11.2424 12.8087 10.6124Z"
                        fill="#1F1F1F"
                      />
                    </svg>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <div
                    onClick={() => {
                      logOut();
                      navigate("/login");
                    }}
                    className="logout cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M12.6 1.5H10.65C8.25 1.5 6.75 3 6.75 5.4V8.4375H11.4375C11.745 8.4375 12 8.6925 12 9C12 9.3075 11.745 9.5625 11.4375 9.5625H6.75V12.6C6.75 15 8.25 16.5 10.65 16.5H12.5925C14.9925 16.5 16.4925 15 16.4925 12.6V5.4C16.5 3 15 1.5 12.6 1.5Z"
                        fill="#FF4C24"
                      />
                      <path
                        d="M3.41812 8.43738L4.97062 6.88488C5.08313 6.77238 5.13562 6.62988 5.13562 6.48738C5.13562 6.34488 5.08313 6.19488 4.97062 6.08988C4.75312 5.87238 4.39313 5.87238 4.17563 6.08988L1.66313 8.60238C1.44563 8.81988 1.44563 9.17988 1.66313 9.39738L4.17563 11.9099C4.39313 12.1274 4.75312 12.1274 4.97062 11.9099C5.18813 11.6924 5.18813 11.3324 4.97062 11.1149L3.41812 9.56238H6.74813V8.43738H3.41812Z"
                        fill="#FF4C24"
                      />
                    </svg>
                    Log Out
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {pathname === "/" ? (
          <div className="pt-[42px]">
            <p className="text-[24px] font-semibold text-primaryColor mb-[4px]">
              Hi {user?.userName ? user.userName : "Person"}
            </p>
            <h1 className="text-[40px] font-semibold text-white">
              Welcome to Dashboard
            </h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Navbar;
