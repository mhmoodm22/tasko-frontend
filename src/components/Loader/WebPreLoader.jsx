import { Bars } from "react-loader-spinner";

const WebPreLoader = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-white flex items-center justify-center">
      <div>
        <Bars
          height="80"
          width="80"
          color="#60E5AE"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default WebPreLoader;
