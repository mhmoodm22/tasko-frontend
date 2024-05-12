import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <Navbar></Navbar>
      {/* main area */}
      <main>
        <div
          className={`main--content--upper w-full 2xl:w-[1320px] mx-auto -mt-6 lg:-mt-[60px] overflow-hidden rounded-[24px]  `}
        >
          <div
            className={`main--content--wrapper overflow-hidden bg-[#fff] p-3 lg:p-7  ${
              pathname === "/"
                ? " h-[calc(100vh-190px)] lg:h-[calc(100vh-280px)]"
                : " h-[calc(100vh-110px)] lg:h-[calc(100vh-150px)]"
            } `}
          >
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
