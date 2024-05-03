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
          className={`main--content--upper  w-[1320px] mx-auto -mt-[60px] overflow-hidden rounded-[24px]`}
        >
          <div
            className={`main--content--wrapper overflow-hidden ${
              pathname === "/"
                ? "h-[calc(100vh-280px)]"
                : "h-[calc(100vh-150px)]"
            } bg-white`}
          >
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;